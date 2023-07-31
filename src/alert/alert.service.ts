import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlertService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlertInput: Prisma.AlertCreateInput) {
    return await this.prisma.alert.create({
      data: createAlertInput,
    });
  }

  async findAll() {
    return await this.prisma.alert.findMany({
      where: {
        isViewed: false,
      },
      select: {
        id: true,
        created_at: true,
        message: true,
        sender_id: true,
        blog_id: true,
        isViewed: true,
      },
    });
  }

  async update(id: number) {
    return await this.prisma.alert.update({
      where: {
        id: id,
      },
      data: {
        isViewed: true,
      },
    });
  }
}
