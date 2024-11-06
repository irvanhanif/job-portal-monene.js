import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateStatusDto } from './dto/application.dto';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async applyJob(applicantId: string, jobId: string) {
    if (!jobId) throw new BadRequestException('Job id required');

    const existingApplication = await this.prisma.application.findFirst({
      where: { jobId, applicantId },
    });

    if (existingApplication)
      throw new BadRequestException('You have already applied in this job');

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });
    if (!job) throw new NotFoundException('job not found');

    const newApplication = await this.prisma.application.create({
      data: { jobId, applicantId },
    });

    return newApplication;
  }

  async getAppliedJobsByUserId(applicantId: string) {
    const applications = await this.prisma.application.findMany({
      where: { applicantId },
      orderBy: { createdAt: 'desc' },
      include: {
        job: { include: { company: true } },
      },
    });

    if (!applications || !applications?.length)
      throw new NotFoundException('No applications found');

    return applications;
  }

  async getApplicantsByJobId(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        Application: {
          orderBy: { createdAt: 'desc' },
          include: { applicant: true },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('job not found');
    }

    return job;
  }

  async updateStatus(id: string, updateStatusData: UpdateStatusDto) {
    const { status } = updateStatusData;

    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) throw new NotFoundException('Application not found');

    const updateApplication = await this.prisma.application.update({
      where: { id },
      data: { status: status?.toLowerCase() },
    });

    return updateApplication;
  }
}
