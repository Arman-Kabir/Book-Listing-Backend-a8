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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
let jwt = require('jsonwebtoken');
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.create({
        data
    });
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    console.log(email, password);
    const isUserExist = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(400, 'User not exist');
    }
    const isPasswordMatched = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) === password;
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(500, 'Password not matched');
    }
    // calculate the "iat" value for one year ago
    const now = Math.floor(Date.now() / 1000);
    const oneYearInSeconds = 365 * 24 * 60 * 60;
    const iat = now - oneYearInSeconds;
    const accessToken = jwt.sign({
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        iat: iat
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return {
        accessToken,
        refreshToken
    };
});
exports.AuthService = {
    createUser,
    loginUser
};
