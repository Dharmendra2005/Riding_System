# Uber Backend API

A RESTful API backend for an Uber-like ride-sharing application built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **Environment Variables:** dotenv

## Project Structure

```
Backend/
├── app.js                 # Express app configuration
├── server.js              # HTTP server entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore
│
├── controllers/
│   └── user.controller.js # User route handlers
│
├── database/
│   └── db.js              # MongoDB connection
│
├── models/
│   └── user-model.js      # User schema and methods
│
├── routes/
│   └── userRouter.js      # User API routes
│
└── services/
    └── user.service.js    # User business logic
```

## Setup & Installation

### 1. Clone the repository

```bash
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the Backend folder:

```env
PORT=4000
DB_CONNECT=mongodb://localhost:27017/uber
JWT_KEY=your_secret_jwt_key
```

### 4. Run the server

```bash
# Development with nodemon
nodemon server.js

# Production
node server.js
```

Server runs on: `http://localhost:4000`

---

## API Endpoints

### Base URL

```
http://localhost:4000
```

---

## User Routes

### 1. Register User

Creates a new user account.

**Endpoint:**
```
POST /users/register
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
| Field | Rule |
|-------|------|
| `fullName.firstName` | Minimum 3 characters |
| `email` | Must be a valid email format |
| `password` | Minimum 6 characters |

**Success Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request) - Validation Error:**
```json
{
  "error": [
    {
      "type": "field",
      "value": "Jo",
      "msg": "First name should be at least 3 character long",
      "path": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

**Error Response - Missing Fields:**
```json
{
  "error": "All field are required"
}
```

---

### 2. Login User

Authenticates a user and returns a JWT token.

**Endpoint:**
```
POST /users/login
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
| Field | Rule |
|-------|------|
| `email` | Must be a valid email format |
| `password` | Minimum 6 characters |

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request) - Validation Error:**
```json
{
  "error": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Email is unvalid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Error Response (401 Unauthorized) - Invalid Credentials:**
```json
{
  "message": "Invalid email or password"
}
```

---

## Models

### User Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName.firstName` | String | Yes | Min 3 characters |
| `fullName.lastName` | String | Yes | Min 3 characters |
| `email` | String | Yes | Unique, min 5 characters |
| `password` | String | Yes | Hashed, not returned in queries |
| `socketId` | String | No | For real-time features |

**User Model Methods:**

| Method | Type | Description |
|--------|------|-------------|
| `generateAuthToken()` | Instance | Generates JWT token (expires in 1 hour) |
| `comparepassword(password)` | Instance | Compares plain password with hash |
| `hashPassword(password)` | Static | Hashes password with bcrypt (salt: 10) |

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Token Details:**
- Algorithm: HS256
- Expiration: 1 hour
- Payload: `{ _id: userId }`

**Using the Token:**

Include the token in the Authorization header for protected routes:
```
Authorization: Bearer <token>
```

---

## Error Handling

### Common Error Responses

| Status Code | Description |
|-------------|-------------|
| `400` | Bad Request - Validation errors |
| `401` | Unauthorized - Invalid/missing token |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error |

---

## Testing with cURL

### Register User

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Testing with Postman

1. Create a new request
2. Set method to `POST`
3. URL: `http://localhost:4000/users/register`
4. Go to Body → raw → JSON
5. Paste the request body
6. Click Send

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.2.1 | MongoDB ODM |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| express-validator | ^7.3.1 | Input validation |
| dotenv | ^17.3.1 | Environment variables |
| cors | ^2.8.6 | Cross-origin requests |

---

## Future Endpoints (Planned)

- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/logout` - User logout
- Captain/Driver routes
- Ride booking routes
- Payment routes

---

## Author

Uber Clone Backend Project
