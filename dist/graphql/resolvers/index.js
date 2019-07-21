"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const saveResolver = (obj, args, ctx, info) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = lodash_1.merge({
    Mutation: {
        createUser: resolveCreateUser
    }
});
//# sourceMappingURL=index.js.map