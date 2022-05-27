import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const app = express();

async function startServer() { 
  const server = new ApolloServer({
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    typeDefs: gql `
      type Client {
        id: ID!
        name: String!
      }

      type Demand {
        id: ID!
        name: String!
        client: Client!
        deadline: String
      }

      type Query {
        demands: [Demand]!
      }
    `,
    resolvers: {
      Query: {
        demands: () => [],
      },
    }
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
    },
  });
};
startServer(app);

/*server.get("/status", (_,response) => {
  response.send({
    status: "Okay",
  });
});

const enableCors = cors({origin: "http://localhost:3000"});

server
  .options("/authenticate", enableCors)
  .post("/authenticate", enableCors, express.json(), (request,response) => {
      console.log("Email: ",request.body.email,"Senha: ",request.body.password);
      response.send({
        Okay: true,
      });
  });*/

const PORT = process.env.PORT ? parseInt(process.env.PORT): 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1" ;

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});