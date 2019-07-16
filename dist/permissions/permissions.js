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
// RECURSIVE RESOLVER CREATION
const createResolver = resolver => {
    const baseResolver = resolver;
    baseResolver.createResolver = childResolver => {
        const newResolver = (parent, args, context) => __awaiter(this, void 0, void 0, function* () {
            yield resolver(parent, args, context);
            return childResolver(parent, args, context);
        });
        return createResolver(newResolver);
    };
    return baseResolver;
};
// AUTHENTICATION PERMISSION
exports.requiresAuth = createResolver((parent, args, context) => {
    if (!context.user) {
        throw new Error("User not identified");
    }
});
// ADMIN PERMISSION
exports.requiresAdmin = exports.requiresAuth.createResolver((parent, args, context) => {
    if (!context.user.isAdmin) {
        throw new Error("You need admin access");
    }
});
//# sourceMappingURL=permissions.js.map