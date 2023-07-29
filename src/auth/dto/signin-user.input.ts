import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;
}
