import fastify from "fastify";
import cors from "fastify-cors";
import mercurius from "mercurius";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { CartResolver } from "./cart";
import { ProductResolver } from "./product";
import { RecipeResolver } from "./recipe";

async function main() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [RecipeResolver, ProductResolver, CartResolver],
  });

  fastify()
    .register(cors)
    .register(mercurius, {
      context: (req) => {
        return {
          sessid: req.headers["x-sessid"],
          url: "http://localhost:3000",
        };
      },
      schema,
      graphiql: true,
    })
    .listen(4000);
}

main().catch(console.error);
