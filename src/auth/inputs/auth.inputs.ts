import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(3)
  username: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}