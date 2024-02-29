import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class PaginationInput {
  @Field(type => Int)
  perPage: number;


  @Field(type => Int)
  @IsNotEmpty()
  page: number;
}
