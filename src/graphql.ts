
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAlertInput {
    message: string;
    sender_id: number;
    blog_id: number;
    isViewed: boolean;
}

export class UpdateAlertInput {
    id: number;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class SigninUserInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export class CreateBlogInput {
    title: string;
    user_id: number;
    content: string;
}

export class UpdateBlogInput {
    id: number;
}

export class CreateUserInput {
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class UpdateUserInput {
    id: number;
}

export class Alert {
    id: number;
    created_at: DateTime;
    message: string;
    sender_id: number;
    blog_id: number;
    isViewed: boolean;
    receiver_id: number;
}

export abstract class IQuery {
    abstract alerts(userId: number): Nullable<Alert>[] | Promise<Nullable<Alert>[]>;

    abstract alert(id: number): Nullable<Alert> | Promise<Nullable<Alert>>;

    abstract blogs(): Nullable<Blog>[] | Promise<Nullable<Blog>[]>;

    abstract blog(id: number): Nullable<Blog> | Promise<Nullable<Blog>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createAlert(createAlertInput: CreateAlertInput): Alert | Promise<Alert>;

    abstract updateAlert(updateAlertInput: UpdateAlertInput): Alert | Promise<Alert>;

    abstract login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract signin(signinUserInput: SigninUserInput): SigninResponse | Promise<SigninResponse>;

    abstract createBlog(createBlogInput: CreateBlogInput): Blog | Promise<Blog>;

    abstract updateBlog(updateBlogInput: UpdateBlogInput): Blog | Promise<Blog>;

    abstract removeBlog(id: number): Nullable<Blog> | Promise<Nullable<Blog>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class LoginResponse {
    access_token: string;
    user: User;
}

export class User {
    id: number;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class SigninResponse {
    user: User;
}

export class Blog {
    id: number;
    created_at: DateTime;
    title: string;
    content?: Nullable<string>;
    user_id: number;
}

export abstract class ISubscription {
    abstract blogCreated(): Blog | Promise<Blog>;
}

export type DateTime = any;
type Nullable<T> = T | null;
