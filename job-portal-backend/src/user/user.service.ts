import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterUserDto, UpdateUserDto } from './dto/user.dto';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserData: RegisterUserDto) {
    const {
      fullname,
      email,
      phoneNumber,
      password,
      role,
      profileBio,
      profileSkills,
      profileResume,
      profileResumeOriginalName,
      profilePhoto,
    } = registerUserData;

    if (!fullname || !email || !phoneNumber || !password)
      throw new BadRequestException('All fields are required');

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log(existingUser, 'existingUser');

    if (existingUser)
      throw new BadRequestException('User already exists with this email');

    const hashedPassword = await hash(password, await genSalt(10));
    console.log(hashedPassword, 'hashedPassword');

    const newUser = await this.prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
        profileBio,
        profileSkills,
        profileResume,
        profileResumeOriginalName,
        profilePhoto,
        role,
      },
    });

    if (!newUser) throw new BadRequestException('User failed to create');

    return {
      user: newUser,
      success: true,
      message: 'User created successfully',
    };
  }

  async login(email: string, password: string, role: string) {
    if (!email || !password || !role)
      throw new BadRequestException('All fields are required');

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new BadRequestException('User not exist');

    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) throw new BadRequestException('Incorrect password');

    if (role !== user.role)
      throw new BadRequestException('Account doesnt exist with current role');

    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.SECRET_KEY, expiresIn: '1w' },
    );

    return { token, user, success: true, message: 'Login successfully' };
  }

  async updateProfile(id: string, updateUserData: UpdateUserDto) {
    const {
      fullname,
      email,
      phoneNumber,
      profileBio,
      profilePhoto,
      profileResume,
      profileResumeOriginalName,
      profileSkills,
    } = updateUserData;

    if (!fullname || !email || !phoneNumber || !profileBio || !profileSkills)
      throw new BadRequestException('All fields are required');

    const userUpdate = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullname,
        email,
        phoneNumber,
        profileBio,
        profilePhoto,
        profileResume,
        profileResumeOriginalName,
        profileSkills,
      },
    });

    return userUpdate;
  }
}
