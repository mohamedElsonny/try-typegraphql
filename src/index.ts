import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { Query, Resolver, buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from 'src/modules/register';

const PORT = 4000;

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello';
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({ resolvers: [HelloResolver, UserResolver] });
  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/graphql`);
  });
};

main();
