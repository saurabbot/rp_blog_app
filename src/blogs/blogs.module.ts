import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { WebsocketsGateway } from 'src/gateway/gateway.module';

@Module({
  providers: [BlogsResolver, BlogsService, PrismaService, WebsocketsGateway],
})
export class BlogsModule {}
