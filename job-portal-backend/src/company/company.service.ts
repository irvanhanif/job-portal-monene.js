import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async postCompany(userId: string, companyData: CreateCompanyDto) {
    const { name, description, website, location, logo } = companyData;

    const existingCompany = await this.prisma.company.findUnique({
      where: {
        name,
      },
    });
    if (existingCompany) throw new BadRequestException('Cant add same company');

    const newCompany = await this.prisma.company.create({
      data: {
        name,
        description,
        website,
        location,
        logo,
        userId,
      },
    });

    return newCompany;
  }

  async getCompaniesByUserId(userId: string) {
    const companies = await this.prisma.company.findMany({
      where: {
        userId,
      },
    });

    if (!companies || !companies?.length)
      throw new NotFoundException('Company not found');

    return companies;
  }

  async getCompanyById(id: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }

  async deleteCompanyById(id: string) {
    const company = await this.prisma.company.delete({
      where: {
        id,
      },
    });

    if (!company) throw new NotFoundException('Company not deleted');

    return company;
  }

  async updateCompany(id: string, updateCompanyData: UpdateCompanyDto) {
    const company = await this.prisma.company.update({
      where: { id },
      data: updateCompanyData,
    });

    if (!company) throw new NotFoundException('Company not found');

    return company;
  }
}
