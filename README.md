### Application Routes:

## User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/1107e6dd-f236-4a09-a454-796450f71a3d (Single GET) Include an id that is saved in your database-->1107e6dd-f236-4a09-a454-796450f71a3d
- api/v1/users/1107e6dd-f236-4a09-a454-796450f71a3d (PATCH)
- api/v1/users/b8d5958a-224e-4b92-996a-e4b3984b7f90 (DELETE) Include an id that is saved in your database-->b8d5958a-224e-4b92-996a-e4b3984b7f90
- api/v1/profile (GET)

## Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/174054bd-4e8b-4db2-85d1-592ac76dc130 (Single GET) Include an id that is saved in your database-->174054bd-4e8b-4db2-85d1-592ac76dc130
- api/v1/categories/174054bd-4e8b-4db2-85d1-592ac76dc130 (PATCH)
- api/v1/categories/e2e5509f-7983-41fd-8727-ef891ab1b14a (DELETE) Include an id that is saved in your database

## Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:categoryId/category (GET)
- api/v1/books/:id (GET)
- api/v1/books/:id (PATCH)
- api/v1/books/:id (DELETE)

 ## Orders
- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:orderId = b4bd5f51-b217-4ebc-8c95-163ce6bfb1d8 (GET)
