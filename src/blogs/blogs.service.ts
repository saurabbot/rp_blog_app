import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}
  async create(createBlogInput: Prisma.BlogCreateInput) {
    const newBlog = await this.prisma.blog.create({
      data: createBlogInput,
      select: {
        id: true,
        title: true,
        content: true,
        user_id: true,
        User: true,
      },
    });
    const allUsers = await this.prisma.user.findMany();
    for (const user of allUsers) {
      if (user.id === newBlog.user_id) {
        continue;
      }
      await this.prisma.alert.create({
        data: {
          message: `${newBlog.User.first_name} posted a blog`,
          sender_id: newBlog.user_id,
          blog_id: newBlog.id,
          receiver_id: user.id,
        },
      });
    }

    return newBlog;
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
