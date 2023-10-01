"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const category_routes_1 = require("../modules/Category/category.routes");
const books_routes_1 = require("../modules/Books/books.routes");
const orders_routes_1 = require("../modules/Orders/orders.routes");
const profile_routes_1 = require("../modules/Profile/profile.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes
    },
    {
        path: "/categories",
        route: category_routes_1.CategoryRoutes
    },
    {
        path: "/books",
        route: books_routes_1.BookRoutes
    },
    {
        path: "/orders",
        route: orders_routes_1.OrderRoutes
    },
    {
        path: "/profile",
        route: profile_routes_1.ProfileRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
