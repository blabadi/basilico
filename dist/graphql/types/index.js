"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const baseTypes = graphql_tag_1.default `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
exports.typeDefs = [baseTypes];
//# sourceMappingURL=index.js.map