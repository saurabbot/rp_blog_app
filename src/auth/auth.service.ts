import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';
import { SigninUserInput } from './dto/signin-user.input';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error('User Authentication Failed');
    }

    if (this.userService.compareUserPassword(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginUserInput.email,
      },
    });
    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }), //todo
      user: result,
    };
  }

  async signin(signinUserInput: SigninUserInput) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: signinUserInput.email,
      },
    });
    if (existingUser) {
      throw new Error('User already exits');
    }
    const newUser = await this.userService.create(signinUserInput);
    return {
      user: newUser,
    };
  }
}
