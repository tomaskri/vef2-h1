# Vefforritun 2, 2023, hópverkefni 1

```bash
createdb vef2-h1
npm install
npm run setup
npm run dev
npm run test # keyrir integration test
```

Hægt að prófa request með því að importa `h1.postman.json` inn í Postman.

### Contributors

nikhil7e
tomaskri
Jónas Hákon Kjartansson
eddi555

### Admin user

username: admin
password: 123

### TEST

Tests can be run with npm run test or npm run test-watch for a more detailed descripton. For the tests to run correctly you will need to have npm run dev running in another terminal to simulate the server side.

# API Documentation

This API provides endpoints for managing users, items, questions and categories.

## Users

### `GET /users`

Returns a list of all users.

### `GET /users/:userId`

Returns the user with the specified `userId`.

### `POST /login`

Authenticates the user and returns a JWT token.

### `POST /signup`

Creates a new user account.

### `GET /admin`

Returns details about the admin user.

### `DELETE /users/:userId`

Deletes the user with the specified `userId`.

### `PATCH /users/:userId`

Updates the user with the specified `userId`. The request body should contain the new properties to be updated.

## Items

### `GET /items`

Returns a list of all items.

### `GET /items/:itemId`

Returns the item with the specified `itemId`.

### `POST /items`

Creates a new item.

### `DELETE /items/:itemId`

Deletes the item with the specified `itemId`.

### `PATCH /items/:itemId`

Updates the item with the specified `itemId`. The request body should contain the new properties to be updated.

## Questions

### `GET /questions`

Returns a list of all questions.

### `GET /questions/:questionId`

Returns the question with the specified `questionId`.

### `POST /questions/:questionId/:itemId`

Adds a vote to the item with the specified `itemId` for the question with the specified `questionId`.

### `POST /questions`

Creates a new question.

### `DELETE /questions/:questionId`

Deletes the question with the specified `questionId`.

### `PATCH /questions/:questionId`

Updates the question with the specified `questionId`. The request body should contain the new properties to be updated.

## Categories

### `GET /categories`

Returns a list of all categories.

### `GET /categories/:categoryId`

Returns the category with the specified `categoryId`.

### `POST /categories`

Creates a new category.

### `DELETE /categories/:categoryId`

Deletes the category with the specified `categoryId`.

### `PATCH /categories/:categoryId`

Updates the category with the specified `categoryId`. The request body should contain the new properties to be updated.
