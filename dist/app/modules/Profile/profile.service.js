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
exports.ProfileService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
let jwt = require('jsonwebtoken');
const getProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    console.log(decoded);
    if (!userId) {
        throw new ApiError_1.default(400, 'userId not exists');
    }
    else if (role !== 'customer' && role !== 'admin') {
        throw new ApiError_1.default(403, 'Access Forbidden');
    }
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userId
        }
    });
    return result;
});
exports.ProfileService = {
    getProfile
};
