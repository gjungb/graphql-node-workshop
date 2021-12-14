import axios from "axios";
import { Ctx, Field, FieldResolver, ObjectType, Query, Resolver, Root } from "type-graphql";
import { Product } from "./product";

@ObjectType({
  description: "A shopping cart",
})
class Cart {
  @Field()
  id!: string;

  @Field(() => [Product], {
    defaultValue: [],
  })
  products?: Product[];

  productIds: string[] = [];
}

@Resolver(() => Cart)
export class CartResolver {
  private carts = new Map<string, Cart>().set("sess123", {
    id: "sess123",
    productIds: ["UZoz2iQ", "dpt46AL"],
  });

  @Query(() => Cart)
  async readCart(@Ctx("sessid") sessid: string): Promise<Cart | undefined> {
    return this.carts.get(sessid);
  }

  @FieldResolver()
  async products(@Root() cart: Cart, @Ctx() ctx: any) {
    console.log(cart);
    const ids = cart.productIds.join("&id=");
    const url = `${ctx.url}/products/?id=${ids}`;
    const resp = await axios.get(url);
    return resp.data;
  }
}
