"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const baseTypes = graphql_tag_1.default `
  type Query {
    user: User
  }
  
  interface Entity {
    id: ID
  }

  type User implements Entity {
    id: ID
    firstname: String
    lastname: String
  }

  input UserInput {
    firstname: String
    lastname: String
  }
`;
exports.typeDefs = [baseTypes];
//# sourceMappingURL=index.js.map