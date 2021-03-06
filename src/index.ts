// Imports
import cors from "cors"
import * as dotenv from 'dotenv'
const env = dotenv.config()
import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import mongo from "mongodb";
import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import { typeDefs } from "./graphql/types";

let graphQLServer: ApolloServer | undefined;

const startGraphql = async () => {

  console.log(process.env.MONGO_URL);
  
  const SECRET = process.env.SECRET || 11111

  // Database connection
  const MONGO_URI = `mongodb://${process.env.MONGO_URL}/basilico`
  const db = await mongo.connect(MONGO_URI, { useNewUrlParser: true });

  
  graphQLServer = new ApolloServer({
    context: ({ req, res }) => ({
      db
    }),
    introspection: true,
    playground: true,
    resolvers,
    typeDefs
  });

  const info = await graphQLServer.listen({port: 3001})
  console.log(info);
  console.log(`🚀 Server ready at http://localhost:${port}${graphQLServer.graphqlPath}`);
};

// App setup
const app = express();
const port = process.env.PORT || 3000;
// Logger
app.use(morgan('dev'))

// CORS
const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false
};

app.use(cors(options))
app.get("/start", (req, res, next) => {
  startGraphql().then(() => res.status(200).send("all good man")).catch(next);
});

app.listen(port, () => {
  console.log("started");
});