"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const auth = {
    // REGISTER
    register: (newUser, models) => __awaiter(this, void 0, void 0, function* () {
        const user = newUser;
        // CHECK IF PASSWORDS MATCH
        if (user.password === user.confirm) {
            // CHECK IF EMAIL EXISTS
            const validEmail = yield models.User.findOne({ email: user.email });
            if (validEmail) {
                throw new Error("Email is already taken");
            }
            // HASH PASSWORD AND CREATE USER
            user.password = yield bcrypt.hash(user.password, 12);
            return yield models.User.create(user);
        }
        throw new Error("Passwords do not match");
    }),
    // LOGIN
    login: (email, password, models, SECRET) => __awaiter(this, void 0, void 0, function* () {
        // CHECK IF EMAIL EXISTS
        const user = yield models.User.findOne({ email });
        if (!user) {
            throw new Error("Email does not exist");
        }
        // CHECK IF PASSWORD MATCHES
        const valid = yield bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Wrong password");
        }
        // GET THE TOKENS AND RETURN THEM ALONG WITH USER
        const [token, refreshToken] = yield auth.createTokens(user, SECRET);
        return {
            isAdmin: user.isAdmin,
            token,
            refreshToken
        };
    }),
    // GET TOKEN
    createTokens: ({ _id, isAdmin }, SECRET) => __awaiter(this, void 0, void 0, function* () {
        // CREATE TOKEN
        const createToken = jwt.sign({ user: { _id, isAdmin } }, SECRET, {
            expiresIn: "20m"
        });
        // CREATE REFRESH TOKEN
        const createRefreshToken = jwt.sign({ user: { _id } }, SECRET, {
            expiresIn: "7d"
        });
        return Promise.all([createToken, createRefreshToken]);
    }),
    // REFRESH TOKENS
    refreshTokens: (token, refreshToken, models, SECRET) => __awaiter(this, void 0, void 0, function* () {
        let userId = -1;
        // VERIFY TOKEN
        try {
            const { user: { _id } } = yield jwt.verify(refreshToken, SECRET);
            userId = _id;
        }
        catch (err) {
            return {};
        }
        // CREATE NEW TOKENS
        const user = yield models.User.findOne({ _id: userId });
        const [newToken, newRefreshToken] = yield auth.createTokens(user, SECRET);
        return {
            token: newToken,
            refreshToken: newRefreshToken,
            user
        };
    }),
    // ADD USER TO CONTEXT
    addUser: (req, res, next, models, SECRET) => __awaiter(this, void 0, void 0, function* () {
        // GET TOKEN FROM HEADERS
        const token = req.headers["x-token"];
        // CHECK IF TOKEN IS VALID
        if (token) {
            try {
                const { user } = yield jwt.verify(token, SECRET);
                req.user = user;
            }
            catch (err) {
                // GET REFRESH TOKEN AND REFRESH THE TOKENS
                const refreshToken = req.headers["x-refresh-token"];
                const newTokens = yield auth.refreshTokens(token, refreshToken, models, SECRET);
                // SET NEW TOKENS TO HEADERS
                if (newTokens.token && newTokens.refreshToken) {
                    res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
                    res.set("x-token", newTokens.token);
                    res.set("x-refresh-token", newTokens.refreshToken);
                }
                req.user = newTokens.user;
            }
        }
        next();
    }),
    // UPDATE USER LAST LOGIN
    updateLastLogin: (user) => __awaiter(this, void 0, void 0, function* () {
        user.online = true;
        user.lastLogin = Date.now();
        yield user.save();
    }),
    logout: (models, user) => __awaiter(this, void 0, void 0, function* () {
        const id = user._id;
        return yield models.User.findOneAndUpdate({ _id: id }, { online: false }, { new: true });
    })
};
exports.default = auth;
//# sourceMappingURL=auth.js.map