import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateJobDto } from './dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async postJob(@Req() req: any, @Body() postJobData: CreateJobDto) {
    const userId = req.user.id;
    const job = await this.jobService.insertJob(userId, postJobData);

    return { job, message: 'Create new job successfully', success: true };
  }

  @Get()
  async getAllJobs(@Query() query: string) {
    const jobs = await this.jobService.getAllJobs(query);

    return { jobs, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@Req() req: any) {
    const userId = req.user.id;
    const favoriteJobs = await this.jobService.getFavorites(userId);
    return { favoriteJobs, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getJobByUserId(@Req() req: any) {
    const userId = req.user.id;
    const jobs = await this.jobService.getJobsByUserId(userId);
    return { jobs, success: true };
  }

  @Get(':id')
  async getJobById(@Param('id') jobId: string) {
    const job = await this.jobService.getJobById(jobId);

    return { job, success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorite/:id')
  async setFavoriteJob(@Req() req: any, @Param('id') jobId: string) {
    const userId = req.user.id;
    const jobFavorite = await this.jobService.createFavorite(jobId, userId);
    return { jobFavorite, success: true };
  }

  @Delete(':id')
  async deleteJob(@Param('id') jobId: string) {
    const job = await this.jobService.deleteJobById(jobId);

    return { job, success: true, message: 'Job deleted succesfully' };
  }
}
