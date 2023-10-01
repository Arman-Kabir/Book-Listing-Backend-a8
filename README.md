### Application Routes:

## User

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/9a38455b-ca91-4031-90e8-dd15c14cdb55 (Single GET) Include an id that is saved in your database
- api/v1/users/9a38455b-ca91-4031-90e8-dd15c14cdb55 (PATCH)
- api/v1/users/9a38455b-ca91-4031-90e8-dd15c14cdb55 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

## Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/835fe270-0370-413b-bbec-443234c91df9 (Single GET) Include an id that is saved in your database
- api/v1/categories/835fe270-0370-413b-bbec-443234c91df9 (PATCH)
- api/v1/categories/835fe270-0370-413b-bbec-443234c91df9 (DELETE) Include an id that is saved in your database

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
- api/v1/orders/:orderId = deb51194-62c8-40b4-be85-daa5fe5f284c (GET)
