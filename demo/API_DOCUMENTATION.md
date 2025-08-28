# 📚 Bookstore API Documentation

## Base URL
```
http://localhost:8080/api
```

## 📖 Books API

### Get All Books / Search Books
```http
GET /api/books?q={search_query}
```
- **Description**: Get all books or search by title, author, or category
- **Parameters**: 
  - `q` (optional): Search query string
- **Response**: Array of Book objects

### Get Book by ID
```http
GET /api/books/{id}
```
- **Description**: Get a specific book by ID
- **Response**: Book object

### Get Recommendations
```http
GET /api/recommendations/{userId}?limit={limit}
```
- **Description**: Get book recommendations for a user
- **Parameters**:
  - `userId`: User ID
  - `limit` (optional): Number of recommendations (default: 8)
- **Response**: Array of Book objects

## 👤 Users API

### Get All Users
```http
GET /api/users
```
- **Description**: Get all users
- **Response**: Array of User objects

### Get User by ID
```http
GET /api/users/{id}
```
- **Description**: Get a specific user by ID
- **Response**: User object

### Get User by Email
```http
GET /api/users/email/{email}
```
- **Description**: Get a user by email address
- **Response**: User object

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "address": "123 Main St, City, State"
}
```
- **Description**: Create a new user
- **Response**: Created User object

### Update User
```http
PUT /api/users/{id}
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "+1-555-0456",
  "address": "456 Oak Ave, City, State"
}
```
- **Description**: Update an existing user
- **Response**: Updated User object

### Delete User
```http
DELETE /api/users/{id}
```
- **Description**: Delete a user
- **Response**: 200 OK

## 🛒 Cart API

### Get Cart Items
```http
GET /api/cart/{userId}
```
- **Description**: Get all cart items for a user
- **Response**: Array of CartItem objects

### Add to Cart
```http
POST /api/cart/{userId}
Content-Type: application/json

{
  "bookId": 1,
  "quantity": 2
}
```
- **Description**: Add a book to user's cart
- **Response**: CartItem object

### Update Cart Item
```http
PUT /api/cart/{userId}/{itemId}
Content-Type: application/json

{
  "bookId": 1,
  "quantity": 3
}
```
- **Description**: Update quantity of a cart item
- **Response**: Updated CartItem object

### Remove from Cart
```http
DELETE /api/cart/{userId}/{itemId}
```
- **Description**: Remove a specific item from cart
- **Response**: 200 OK

### Clear Cart
```http
DELETE /api/cart/{userId}
```
- **Description**: Remove all items from user's cart
- **Response**: 200 OK

## ⭐ Reviews API

### Get Reviews by Book
```http
GET /api/reviews/book/{bookId}
```
- **Description**: Get all reviews for a specific book
- **Response**: Array of Review objects

### Get Reviews by User
```http
GET /api/reviews/user/{userId}
```
- **Description**: Get all reviews by a specific user
- **Response**: Array of Review objects

### Add Review
```http
POST /api/reviews
Content-Type: application/json

{
  "bookId": 1,
  "userId": 1,
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```
- **Description**: Add a new review
- **Response**: Review object

### Update Review
```http
PUT /api/reviews/{reviewId}
Content-Type: application/json

{
  "bookId": 1,
  "userId": 1,
  "rating": 4,
  "comment": "Good book, updated my review."
}
```
- **Description**: Update an existing review
- **Response**: Updated Review object

### Delete Review
```http
DELETE /api/reviews/{reviewId}?userId={userId}
```
- **Description**: Delete a review
- **Response**: 200 OK

### Get Review Statistics
```http
GET /api/reviews/book/{bookId}/stats
```
- **Description**: Get average rating and review count for a book
- **Response**: 
```json
{
  "averageRating": 4.5,
  "reviewCount": 10
}
```

## 🗄️ Database Console

### H2 Database Console
```
http://localhost:8080/h2-console
```
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## 📊 Sample Data

The application automatically creates sample data on startup:

### Users
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)  
- Bob Johnson (bob.johnson@example.com)

### Books
- The Great Gatsby
- To Kill a Mockingbird
- 1984
- Pride and Prejudice
- The Catcher in the Rye
- Lord of the Flies
- The Hobbit
- Harry Potter and the Sorcerer's Stone
- The Da Vinci Code
- The Alchemist

## 🔧 Error Responses

### 400 Bad Request
- Invalid request data
- Validation errors

### 403 Forbidden
- User doesn't have permission to access resource

### 404 Not Found
- Resource not found

### 500 Internal Server Error
- Server error
