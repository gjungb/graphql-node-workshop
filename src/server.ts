import Fastify from "fastify";
import mercurius from "mercurius";

const app = Fastify();

const schema = `
  type Query {
    add(x: Int, y: Int): Int
  }
`;

const resolvers = {
  Query: {
    add: async (_: any, { x, y }: any) => x + y,
  },
};

app
  .register(mercurius, {
    schema,
    resolvers,
    graphiql: true
  })
  .listen(3000)
  .then((address) => console.log(`${address}/graphiql`))
  .catch((err) => console.error(err));
