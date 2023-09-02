import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { CategoryRoutes } from '../modules/Category/category.routes';
import { BookRoutes } from '../modules/Books/books.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: "/users",
    route: UserRoutes
  },
  {
    path: "/categories",
    route: CategoryRoutes
  },
  {
    path: "/books",
    route: BookRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
