import { Injectable } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return null;
    }
    // TODO: make secure

    if (user.password === password) {
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
      access_token: 'jwt', //todo
      user: result,
    };
  }
}
