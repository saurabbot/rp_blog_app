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
    return this.prisma.user.create({
      data: encryptedUserInput,
    });
  }

  findAll() {
    return this.prisma.user.findMany();
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
