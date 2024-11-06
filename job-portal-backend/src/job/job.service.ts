import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateJobDto } from './dto/job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async insertJob(createdById: string, insertJobDto: CreateJobDto) {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = insertJobDto;

    const newJob = await this.prisma.job.create({
      data: {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experienceLevel,
        position,
        companyId,
        createdById,
      },
    });

    if (!newJob) throw new BadRequestException('Create job is failed');

    return newJob;
  }

  async getAllJobs(query: any) {
    const { keyword, location, jobType, salary } = query;

    const salaryRange = salary?.split('-');

    let jobs = [];
    if (keyword || location || jobType || salary) {
      jobs = await this.prisma.job.findMany({
        where: {
          ...(keyword && {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
            ],
          }),
          ...(location && {
            location: { contains: location, mode: 'insensitive' },
          }),
          ...(jobType && {
            jobType: { contains: jobType, mode: 'insensitive' },
          }),
          ...(salary &&
            salaryRange?.length && {
              salary: {
                gte: parseInt(salaryRange[0]),
                lte: parseInt(salaryRange[1]),
              },
            }),
        },
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      jobs = await this.prisma.job.findMany({
        skip: 0,
        take: 6,
        include: { company: true },
      });
    }

    if (!jobs || jobs.length == 0)
      throw new NotFoundException('Jobs are not found');

    return jobs;
  }

  async getJobById(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { company: true, Application: true },
    });

    if (!job) throw new NotFoundException('Job not found');

    return job;
  }

  async createFavorite(jobId: string, userId: string) {
    let newFav: any;
    try {
      const jobFav = await this.prisma.favorite.findFirst({
        where: { jobId, userId },
      });
      if (jobFav)
        throw new BadRequestException('This job is already in favorite');

      newFav = await this.prisma.favorite.create({
        data: { jobId, userId },
      });
      if (!newFav)
        throw new InternalServerErrorException('Job not added in favorite');

      return newFav;
    } catch (error) {
      throw error;
    }
  }

  async getFavorites(userId: string) {
    try {
      const favJobs = await this.prisma.favorite.findMany({
        where: { userId },
        include: { job: { include: { company: true } } },
      });

      if (!favJobs?.length)
        throw new NotFoundException('job favorites not found');

      return favJobs;
    } catch (error) {
      throw error;
    }
  }

  async getJobsByUserId(createdById: string) {
    try {
      const jobs = await this.prisma.job.findMany({
        where: { createdById },
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      });

      if (!jobs || !jobs?.length) throw new NotFoundException('Jobs not found');

      return jobs;
    } catch (error) {
      throw error;
    }
  }

  async deleteJobById(id: string) {
    const job = await this.prisma.job.delete({
      where: {
        id,
      },
    });

    if (!job) throw new NotFoundException('Company not deleted');

    return job;
  }
}
