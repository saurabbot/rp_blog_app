import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { GraphQLDateTime } from 'graphql-iso-date';
import { WebsocketsGateway } from './gateway/gateway.module';
import { AlertModule } from './alert/alert.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLDateTime },
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
    UsersModule,
    AuthModule,
    BlogsModule,
    AlertModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebsocketsGateway],
})
export class AppModule {}
