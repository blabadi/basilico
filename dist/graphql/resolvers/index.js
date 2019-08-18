"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const graphql_1 = __importDefault(require("graphql"));
const saveResolver = (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
    console.log(`${obj}, ${args}, ${ctx}, ${info}`);
});
const resolveCreateUser = (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
    const user = lodash_1.get(args, "user", {});
    const name = `${user.firstname} ${user.lastname}`;
    console.log(`in create User ${name}`);
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        id: "12314124"
    };
});

exports.mutationType = new graphql_1.default.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        saveEntity: {
            // return type
            type: graphql_1.default.GraphQLString,
            args: {
                id: { type: graphql_1.default.GraphQLString },
                breed: { type: graphql_1.default.GraphQLString },
                displayImage: { type: graphql_1.default.GraphQLString }
            },
            resolve: function (_, arg) {
                new Array().push({
                    id: arg.id
                });
                return "OK!";
            }
        }
    }
});
exports.default = lodash_1.merge({
    Mutation: {
        createUser: resolveCreateUser,
        save: saveResolver,
    }
});
//# sourceMappingURL=index.js.map