import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '1w',
      },
    }),
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
