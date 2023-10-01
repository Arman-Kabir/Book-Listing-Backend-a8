"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-book', books_controller_1.BookController.createBook);
router.get('/', books_controller_1.BookController.getAllBooks);
router.get('/:id', books_controller_1.BookController.getSingleBook);
router.get('/:categoryId/category', books_controller_1.BookController.getBooksByCategoryId);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.updateSingleBook);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), books_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
