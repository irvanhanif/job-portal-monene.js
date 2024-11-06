import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCompany(
    @Req() req: any,
    @Body() createCompanyData: CreateCompanyDto,
  ) {
    const userId = req.user.id;
    const result = await this.companyService.postCompany(
      userId,
      createCompanyData,
    );

    return {
      message: 'Company successfully created',
      company: result,
      success: true,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCompaniesUser(@Req() req: any) {
    const userId = req.user.id;
    const companies = await this.companyService.getCompaniesByUserId(userId);

    return { companies, success: true };
  }

  @Get(':id')
  async getCompanyById(@Param('id') companyId: string) {
    const company = await this.companyService.getCompanyById(companyId);

    return { company, success: true };
  }

  @Delete(':id')
  async deleteCompany(@Param('id') companyId: string) {
    const company = await this.companyService.deleteCompanyById(companyId);

    return { company, success: true, message: 'Company deleted succesfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCompany(
    @Param('id') companyId: string,
    @Body() updateCompanyData: UpdateCompanyDto,
  ) {
    const result = await this.companyService.updateCompany(
      companyId,
      updateCompanyData,
    );

    return {
      company: result,
      success: true,
      message: 'Company updated successfully',
    };
  }
}
