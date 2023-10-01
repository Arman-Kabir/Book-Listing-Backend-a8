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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const books_constants_1 = require("./books.constants");
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(filters, options);
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    // console.log(page, size, skip);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    // category,
    // console.log(search, category, filterData);
    const andConditions = [];
    // 91a9cc82-5989-4ff8-b820-66449dffdc95
    if (search) {
        andConditions.push({
            OR: books_constants_1.booksSearchAbleFileds.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }
    // if (category) {
    //     andConditions.push({
    //         categoryId: {
    //             contains: category,
    //             mode: 'insensitive'
    //         }
    //     })
    // }
    // console.log(filterData);
    // console.log(andConditions);
    if (filterData.minPrice && filterData.maxPrice) {
        andConditions.push({
            price: {
                gte: parseFloat(filterData === null || filterData === void 0 ? void 0 : filterData.minPrice),
                lte: parseFloat(filterData === null || filterData === void 0 ? void 0 : filterData.maxPrice)
            }
        });
    }
    // console.log(andConditions);
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true
        },
        where: whereConditions,
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            }
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions
    });
    const totalPage = Math.ceil(total / size) + 1;
    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
});
const getBooksByCategoryId = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id
            // id
        },
        include: {
            category: true
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc'
            }
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId: id
        },
    });
    const totalPage = Math.ceil(total / size) + 1;
    return {
        meta: {
            page,
            size,
            total,
            totalPage
        },
        data: result
    };
});
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true
        }
    });
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: true
        }
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    getBooksByCategoryId,
    updateSingleBook,
    deleteBook
};
