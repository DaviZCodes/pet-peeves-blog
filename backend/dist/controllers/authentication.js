"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const users_1 = require("../database/users");
const helpers_1 = require("../helpers");
//import jwt from "jsonwebtoken";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!password || !username) {
            return res.sendStatus(400);
        }
        const user = yield (0, users_1.getUserByUsername)(username).select("+authentication.salt +authentication.password");
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        yield user.save();
        res.cookie("PETLOGGER-AUTH", user.authentication.sessionToken, { domain: "localhost", path: "/" });
        return res.status(200).json(user).end();
    }
    //if error logging in
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!password || !username) {
            return res.sendStatus(400);
        }
        //encrypt the password with random numbers and characters
        const salt = (0, helpers_1.random)();
        const user = yield (0, users_1.createUser)({
            username,
            authentication: {
                salt, password: (0, helpers_1.authentication)(salt, password),
            },
        });
        //if everything is working fine,
        return res.status(200).json(user).end();
    }
    //if error creating a user
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.register = register;
//# sourceMappingURL=authentication.js.map