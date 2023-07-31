import { Module } from '@nestjs/common';
import { AlertResolver } from './alert.resolver';
import { AlertService } from './alert.service';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  providers: [AlertResolver, AlertService, PrismaService],
})
export class AlertModule {}
