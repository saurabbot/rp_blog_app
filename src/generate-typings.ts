import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definistionsFactory = new GraphQLDefinitionsFactory();

definistionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: true,
});
