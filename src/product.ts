import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import axios from "axios";

@ObjectType()
export class Product {
  @Field()
  id!: string;

  @Field({
    description: "Some stuff",
  })
  name!: string;

  @Field({
    nullable: true,
  })
  description?: string;

  @Field()
  price!: number;
}

@InputType()
class AddProductInput implements Partial<Product> {
  @Field({
    description: "Some stuff",
  })
  name!: string;

  @Field({
    nullable: true,
  })
  description?: string;

  @Field()
  price!: number;
}

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  async product(@Arg("id") id: string, @Ctx() ctx: any): Promise<Product> {
    const url = `${ctx.url}/products/${id}`;
    const resp = await axios.get(url);
    return resp.data;
  }

  @Mutation(() => Product)
  async addProduct(@Arg("data") input: AddProductInput): Promise<Product> {
    const url = `http://localhost:3000/products`;
    const resp = await axios.post(url, input);
    return resp.data;
  }
}
