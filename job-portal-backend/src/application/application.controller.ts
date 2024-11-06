import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateStatusDto } from './dto/application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async applyJob(@Req() req: any, @Param('id') jobId: string) {
    const userId = req.user.id;
    const application = await this.applicationService.applyJob(userId, jobId);

    return { application, message: 'Job applied successfully', success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusData: UpdateStatusDto,
  ) {
    const updateAppStatus = await this.applicationService.updateStatus(
      id,
      updateStatusData,
    );
    return {
      message: 'Status update successfully',
      status: updateAppStatus,
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getAppliedJobs(@Req() req: any) {
    const userId = req.user.id;
    const userAppliedJobs =
      await this.applicationService.getAppliedJobsByUserId(userId);

    return { appliedJobs: userAppliedJobs, success: true };
  }

  @Get('job/:id')
  async getApplicantsByJobId(@Param('id') jobId: string) {
    const job = await this.applicationService.getApplicantsByJobId(jobId);
    return { job, success: true };
  }
}
