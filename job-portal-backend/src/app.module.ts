import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { UserService } from './user/user.service';
import { ApplicationService } from './application/application.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: '1w',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    PrismaService,
    UserService,
    ApplicationService,
  ],
})
export class AppModule {}
