import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGaurd } from './gql-auth.gaurd';
import { SigninResponse } from './dto/signin-response';
import { SigninUserInput } from './dto/signin-user.input';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGaurd)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => SigninResponse)
  async signin(@Args('signinUserInput') signinUserInput: SigninUserInput) {
    return this.authService.signin(signinUserInput);
  }
}
