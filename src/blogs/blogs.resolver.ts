import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt-aut.gaurd';
import { Prisma } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { UpdateBlogInput } from './dto/update-blog.input';
import { WebsocketsGateway } from 'src/gateway/gateway.module';
const pubSub = new PubSub();

@Resolver('Blog')
export class BlogsResolver {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly websocketsGateway: WebsocketsGateway,
  ) {}

  @Mutation('createBlog')
  async create(
    @Args('createBlogInput') createBlogInput: Prisma.BlogCreateInput,
  ) {
    const newBlog = await this.blogsService.create(createBlogInput);
    pubSub.publish('blogCreated', { blogCreated: newBlog });
    this.websocketsGateway.sendRealTimeUpdate(newBlog);
    return newBlog;
  }

  @Query('blogs')
  // @UseGuards(JwtAuthGaurd)
  findAll() {
    return this.blogsService.findAll();
  }

  @Query('blog')
  findOne(@Args('id') id: number) {
    return this.blogsService.findOne(id);
  }

  @Mutation('updateBlog')
  update(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation('removeBlog')
  remove(@Args('id') id: number) {
    return this.blogsService.remove(id);
  }

  @Subscription('blogCreated')
  blogCreated() {
    return pubSub.asyncIterator('blogCreated');
  }
}
