// Imports
import cors from "cors"
import * as dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import mongoose from 'mongoose'
import graphQLServer from './graphql/schema'
import auth from './services/auth'
import models from './models/index'

// Environment variables
const env = dotenv.config()
console.log(process.env.MONGO_URL);
// App setup
const app = express();
const port = process.env.PORT || 8081
const SECRET = process.env.SECRET || 11111

// Database connection
const MONGO_URI = `mongodb://${process.env.MONGO_URL}/basilico`

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(
    (): void => {
      console.log('Connection to database successful')
    }
  )
  .catch(
    (err): void => {
      console.log(err)
    }
  )

// Add user to context
app.use(async (req, res, next) => {
  await auth.addUser(req, res, next, models, SECRET)
})

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

// Apply GraphQL server
const httpServer = createServer(app)
graphQLServer.applyMiddleware({ app })
graphQLServer.installSubscriptionHandlers(httpServer)

// Wrap the Express server
httpServer.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${graphQLServer.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${graphQLServer.subscriptionsPath}`)
})
