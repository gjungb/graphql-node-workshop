// recipe.ts
import {
    Arg,
    Field, Int, ObjectType, Query, Resolver
} from "type-graphql";

@ObjectType({ description: "Object representing cooking recipe" })
export class Recipe {
  @Field()
  title!: string;

  @Field(() => String, {
    nullable: true,
    deprecationReason: "Use `description` field instead",
  })
  get specification(): string | undefined {
    return this.description;
  }

  @Field({
    nullable: true,
    description: "The recipe description with preparation info",
  })
  description?: string;

  @Field(() => [Int])
  ratings!: number[];

  @Field()
  creationDate!: Date;
}

@Resolver()
export class RecipeResolver {
  @Query(() => Recipe, { nullable: true })
  async recipe(
    @Arg("title") title: string
  ): Promise<Omit<Recipe, "specification"> | undefined> {
    return {
      description: "Desc 1",
      title,
      ratings: [0, 3, 1],
      creationDate: new Date(),
    };
  }
}
