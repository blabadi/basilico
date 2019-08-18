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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const env = dotenv.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongodb_1 = __importDefault(require("mongodb"));
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const types_1 = require("./graphql/types");
let graphQLServer;
const startGraphql = () => __awaiter(this, void 0, void 0, function* () {
    console.log(process.env.MONGO_URL);
    const SECRET = process.env.SECRET || 11111;
    // Database connection
    const MONGO_URI = `mongodb://${process.env.MONGO_URL}/basilico`;
    const db = yield mongodb_1.default.connect(MONGO_URI, { useNewUrlParser: true });
    graphQLServer = new apollo_server_1.ApolloServer({
        context: ({ req, res }) => ({
            db
        }),
        introspection: true,
        playground: true,
        resolvers: resolvers_1.default,
        typeDefs: types_1.typeDefs
    });
    const info = yield graphQLServer.listen({ port: 3001 });
    console.log(info);
    console.log(`🚀 Server ready at http://localhost:${port}${graphQLServer.graphqlPath}`);
});
// App setup
const app = express_1.default();
const port = process.env.PORT || 3000;
// Logger
app.use(morgan_1.default('dev'));
// CORS
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use(cors_1.default(options));
app.get("/start", (req, res, next) => {
    startGraphql().then(() => res.status(200).send("all good man")).catch(next);
});
app.listen(port, () => {
    console.log("started");
    startGraphql();
});
//# sourceMappingURL=index.js.map