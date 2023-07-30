import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  async create(createBlogInput: Prisma.BlogCreateInput) {
    return await this.prisma.blog.create({
      data: createBlogInput,
      select: {
        id: true,
        title: true,
        content: true,
        user_id: true,
        User: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogInput: UpdateBlogInput) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
