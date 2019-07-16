"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
const types_1 = require("./types");
const models_1 = __importDefault(require("../models"));
require("dotenv").config();
const SECRET = process.env.SECRET;
// GraphQL server
const graphQLServer = new apollo_server_express_1.ApolloServer({
    context: ({ req, res }) => ({
        models: models_1.default,
        SECRET,
        user: req.user
    }),
    introspection: true,
    playground: true,
    resolvers: resolvers_1.default,
    typeDefs: types_1.typeDefs
});
// Exports
exports.default = graphQLServer;
//# sourceMappingURL=schema.js.map