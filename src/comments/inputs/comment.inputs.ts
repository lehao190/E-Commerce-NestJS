import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @MinLength(5)
  text: string;


  @Field(type => Int)
  @IsNotEmpty()
  rating: number;

  @Field(type => Int)
  commenterId: number;

  @Field(type => Int)
  productId: number;
}
