import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AlertService } from './alert.service';
import { Prisma } from '@prisma/client';
@Resolver()
export class AlertResolver {
  constructor(private alertService: AlertService) {}

  @Mutation('createAlert')
  create(@Args('createAlert') createAlertInput: Prisma.AlertCreateInput) {
    return this.alertService.create(createAlertInput);
  }
  @Query('alerts')
  findAll() {
    return this.alertService.findAll();
  }
}
