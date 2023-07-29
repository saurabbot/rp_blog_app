import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserInput: Prisma.UserCreateInput) {
    const { password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedUserInput: Prisma.UserCreateInput = {
      ...createUserInput,
      password: hashedPassword,
    };
    return await this.prisma.user.create({
      data: encryptedUserInput,
    });
  }

  async compareUserPassword(plainTextPassword: string, hashedPassword: string) {
    const isSame = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isSame;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
