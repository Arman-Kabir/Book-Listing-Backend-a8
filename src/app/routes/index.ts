import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { CategoryRoutes } from '../modules/Category/category.routes';
import { BookRoutes } from '../modules/Books/books.routes';
import { OrderRoutes } from '../modules/Orders/orders.routes';
import { ProfileRoutes } from '../modules/Profile/profile.routes';

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
  },
  {
    path: "/orders",
    route: OrderRoutes
  },
  {
    path: "/profile",
    route: ProfileRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
