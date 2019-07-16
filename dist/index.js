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
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./graphql/schema"));
const auth_1 = __importDefault(require("./services/auth"));
const index_1 = __importDefault(require("./models/index"));
// Environment variables
const env = dotenv.config();
console.log(process.env.MONGO_URL);
// App setup
const app = express_1.default();
const port = process.env.PORT || 8081;
const SECRET = process.env.SECRET || 11111;
// Database connection
const MONGO_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${process.env.MONGO_URL}`;
mongoose_1.default
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
    console.log('Connection to database successful');
})
    .catch((err) => {
    console.log(err);
});
// Add user to context
app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield auth_1.default.addUser(req, res, next, index_1.default, SECRET);
}));
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
// Apply GraphQL server
const httpServer = http_1.createServer(app);
schema_1.default.applyMiddleware({ app });
schema_1.default.installSubscriptionHandlers(httpServer);
// Wrap the Express server
httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${schema_1.default.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${schema_1.default.subscriptionsPath}`);
});
//# sourceMappingURL=index.js.map