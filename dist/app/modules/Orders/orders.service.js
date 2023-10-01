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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
let jwt = require('jsonwebtoken');
const getAllOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    console.log(decoded);
    if (!userId) {
        throw new ApiError_1.default(400, 'userId not exists');
    }
    else if (role === 'admin') {
        const result = yield prisma_1.default.order.findMany({});
        return result;
    }
    else {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId
            }
        });
        return result;
    }
});
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: data
    });
    return result;
});
const getSingleOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    console.log(decoded);
    if (!userId) {
        throw new ApiError_1.default(400, 'userId not exists');
    }
    else if (role === 'admin') {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id
            }
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id
            }
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) == userId) {
            return result;
        }
        else {
            return "U r not authorized for this order";
        }
    }
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
