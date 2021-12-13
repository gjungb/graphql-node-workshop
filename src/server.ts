import fastify from "fastify";
import mercurius from "mercurius";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./recipe";

async function main() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  fastify()
    .register(mercurius, {
      schema,
      graphiql: true,
    })
    .listen(4000);
}

main().catch(console.error);
