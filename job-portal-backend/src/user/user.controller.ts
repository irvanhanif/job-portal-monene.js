import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, UpdateUserDto } from './dto/user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserData: RegisterUserDto) {
    return this.userService.register(registerUserData);
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    const { email, password, role } = body;

    console.log(email, password);
    try {
      const loginResponse = await this.userService.login(email, password, role);

      res.cookie('token', loginResponse?.token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      });

      return res.status(200).json(loginResponse);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
        success: false,
      });
    }
  }

  @Delete('logout')
  async logout(@Res() res: Response) {
    res.cookie('token', '');

    return res
      .status(200)
      .json({ message: 'Logged out successfully', success: true });
  }

  // update user
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(
    @Req() req: any,
    @Body() updateUserData: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const userUpdated = await this.userService.updateProfile(
        userId,
        updateUserData,
      );
      return res.status(200).json({
        message: 'Profile updated successfully',
        user: userUpdated,
        success: true,
      });
      console.log(userId, 'userId');
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message || 'Internal server error',
        success: false,
      });
    }
  }
}
