import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

// Create Product Input
@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @MinLength(5)
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(20)
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  image: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => Int, { nullable: true })
  ratings?: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  category: string;
}

// Update Product Input
@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(150)
  @MinLength(5)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(500)
  @MinLength(20)
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Field((type) => Int, { nullable: true })
  price?: number;

  @Field((type) => Int, { nullable: true })
  quantity?: number;

  @Field((type) => Int, { nullable: true })
  ratings?: number;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(20)
  category?: string;
}
