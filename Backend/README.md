# Riding System Backend API

A comprehensive RESTful API backend for an Uber-like ride-sharing application with real-time features built using Node.js, Express, MongoDB, and Socket.IO.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** express-validator
- **Geocoding & Routing:** OpenWeatherMap Geocoding API + OSRM (Open Source Routing Machine)
- **Environment Variables:** dotenv

## 📁 Project Structure

```
Backend/
├── app.js                          # Express app configuration
├── server.js                       # HTTP server & Socket.IO setup
├── socket.js                       # Socket.IO event handlers
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables
├── .gitignore
│
├── controllers/
│   ├── user.controller.js          # User authentication handlers
│   ├── captain.controller.js       # Captain authentication handlers
│   ├── ride.controller.js          # Ride management handlers
│   └── map.controller.js           # Map & geocoding handlers
│
├── database/
│   └── db.js                       # MongoDB connection setup
│
├── models/
│   ├── user-model.js               # User schema & methods
│   ├── captain.model.js            # Captain schema & methods
│   ├── ride.model.js               # Ride schema
│   └── blacklistToken.model.js     # Blacklisted tokens for logout
│
├── routes/
│   ├── userRouter.js               # User API routes
│   ├── captainRouter.js            # Captain API routes
│   ├── rideRouter.js               # Ride API routes
│   └── mapRouter.js                # Map API routes
│
├── services/
│   ├── user.service.js             # User business logic
│   ├── captain.service.js          # Captain business logic
│   ├── ride.service.js             # Ride business logic
│   └── map.service.js              # Geocoding & routing logic
│
└── middlewares/
    └── auth.middleware.js          # JWT authentication middleware
```

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 2. Clone and Navigate

```bash
cd Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Create a `.env` file in the Backend folder with the following:

```env
PORT=4000
DB_CONNECT=mongodb://localhost:27017/uber
JWT_KEY=your_secret_jwt_key_here_use_random_string
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
```

**Get OpenWeatherMap API Key:**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Generate a free API key
3. Add it to your `.env` file

### 5. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
# or
npx nodemon
```

**Production mode:**
```bash
npm start
# or
node server.js
```

Server runs on: `http://localhost:4000`

---

## 🎯 Features Implemented

### 1. **User Management**
- User registration with validation
- Secure login with JWT authentication
- Password hashing with bcrypt
- User profile retrieval
- Logout with token blacklisting

### 2. **Captain (Driver) Management**
- Captain registration with vehicle details
- Captain authentication
- Captain profile management
- Real-time location tracking
- Active/Inactive status management

### 3. **Ride Management**
- Create ride requests
- Fare calculation based on distance and vehicle type
- Find nearby captains within radius
- Captain can accept/reject rides
- OTP-based ride verification
- Ride lifecycle: pending → accepted → ongoing → completed
- Real-time ride status updates

### 4. **Real-time Features (Socket.IO)**
- WebSocket connection management
- Captain location broadcasting
- Ride request notifications to nearby captains
- Live ride status updates
- User-Captain communication channel

### 5. **Map & Geocoding Services**
- Address to coordinates conversion (Geocoding)
- Distance and time calculation between locations
- Autocomplete location suggestions
- Find captains within specified radius using Haversine formula

### 6. **Security Features**
- JWT-based authentication
- Password encryption
- Token blacklisting on logout
- Protected routes with middleware
- Input validation and sanitization

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4000
```

---

## 👤 User Routes

### 1. Register User

Creates a new user account with encrypted password.

**Endpoint:** `POST /users/register`

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

**Validation:**
- `firstName`: Min 3 characters
- `lastName`: Min 3 characters
- `email`: Valid email format
- `password`: Min 6 characters

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "socketId": null
  }
}
```

### 2. Login User

Authenticates user and returns JWT token.

**Endpoint:** `POST /users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { /* user object */ }
}
```

### 3. Get User Profile

Retrieves authenticated user's profile.

**Endpoint:** `GET /users/profile`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
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

### 4. Logout User

Logs out user and blacklists the token.

**Endpoint:** `GET /users/logout`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 🚗 Captain Routes

### 1. Register Captain

Creates a new captain account with vehicle details.

**Endpoint:** `POST /captains/register`

**Request Body:**
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Driver"
  },
  "email": "jane@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation:**
- `firstName`, `lastName`: Min 3 characters
- `email`: Valid email format
- `password`: Min 6 characters
- `vehicleType`: Must be "car", "bike", or "auto"
- `capacity`: Min 1

**Success Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": { "firstName": "Jane", "lastName": "Driver" },
    "email": "jane@example.com",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": { "ltd": null, "lng": null }
  }
}
```

### 2. Login Captain

**Endpoint:** `POST /captains/login`

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

### 3. Get Captain Profile

**Endpoint:** `GET /captains/profile`

**Headers:** `Authorization: Bearer <token>`

### 4. Logout Captain

**Endpoint:** `GET /captains/logout`

**Headers:** `Authorization: Bearer <token>`

---

## 🚕 Ride Routes

### 1. Create Ride

Creates a new ride request and notifies nearby captains.

**Endpoint:** `POST /rides/create-ride`

**Headers:** `Authorization: Bearer <user-token>`

**Request Body:**
```json
{
  "pickupLocation": "Connaught Place, New Delhi",
  "dropoffLocation": "Sector 18, Noida",
  "vehicleType": "car"
}
```

**Validation:**
- `pickupLocation`: Min 3 characters
- `dropoffLocation`: Min 3 characters
- `vehicleType`: "auto", "car", or "bike"

**Success Response (201):**
```json
{
  "ride": {
    "_id": "ride123",
    "user": "user123",
    "pickupLocation": "Connaught Place, New Delhi",
    "dropoffLocation": "Sector 18, Noida",
    "vehicleType": "car",
    "fare": 450,
    "distance": 18500,
    "duration": 1800,
    "status": "pending",
    "otp": "123456"
  }
}
```

**Background Process:**
- Geocodes pickup location
- Finds captains within 10km radius
- Sends `newriderequest` socket event to nearby captains

### 2. Get Fare Estimate

Calculates fare for a ride before booking.

**Endpoint:** `GET /rides/get-fare`

**Headers:** `Authorization: Bearer <user-token>`

**Query Parameters:**
- `pickupLocation`: Starting address
- `dropoffLocation`: Destination address

**Example:**
```
GET /rides/get-fare?pickupLocation=Delhi&dropoffLocation=Noida
```

**Success Response (200):**
```json
{
  "fare": {
    "auto": 280,
    "car": 450,
    "bike": 180
  }
}
```

**Fare Calculation Logic:**
```javascript
baseFare = { auto: 30, car: 50, bike: 20 }
perKmRate = { auto: 10, car: 15, bike: 5 }
perMinuteRate = { auto: 2, car: 3, bike: 1.5 }

fare = baseFare + (distance/1000 * perKmRate) + (duration/60 * perMinuteRate)
```

### 3. Confirm Ride (Captain)

### 3. Confirm Ride (Captain)

Captain accepts a ride request.

**Endpoint:** `POST /rides/confirm-ride`

**Headers:** `Authorization: Bearer <captain-token>`

**Request Body:**
```json
{
  "rideId": "ride123"
}
```

**Success Response (200):**
```json
{
  "ride": {
    "_id": "ride123",
    "status": "accepted",
    "captain": { /* captain details */ },
    "user": { /* user details */ },
    "otp": "123456",
    "fare": 450
  }
}
```

**Socket Event Emitted:**
- Event: `ride-confirmed`
- Target: User's socketId
- Data: Full ride object with captain details

### 4. Start Ride (Captain)

Captain starts the ride after verifying OTP.

**Endpoint:** `GET /rides/start-ride`

**Headers:** `Authorization: Bearer <captain-token>`

**Query Parameters:**
- `rideId`: Ride ID
- `otp`: 6-digit OTP from user

**Example:**
```
GET /rides/start-ride?rideId=ride123&otp=123456
```

**Success Response (200):**
```json
{
  "ride": {
    "_id": "ride123",
    "status": "ongoing",
    "startTime": "2026-03-08T10:30:00.000Z"
  }
}
```

**Socket Event Emitted:**
- Event: `ride-started`
- Target: User's socketId

### 5. End Ride (Captain)

Captain ends the ride upon reaching destination.

**Endpoint:** `POST /rides/end-ride`

**Headers:** `Authorization: Bearer <captain-token>`

**Request Body:**
```json
{
  "rideId": "ride123"
}
```

**Success Response (200):**
```json
{
  "message": "Ride ended successfully"
}
```

**Socket Event Emitted:**
- Event: `ride-ended`
- Target: User's socketId

---

## 🗺️ Map Routes

### 1. Get Coordinates

Convert address to latitude/longitude.

**Endpoint:** `GET /maps/get-coordinates`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `address`: Location address

**Example:**
```
GET /maps/get-coordinates?address=Connaught Place, New Delhi
```

**Success Response (200):**
```json
{
  "lat": 28.6304,
  "lng": 77.2177,
  "name": "New Delhi",
  "country": "IN",
  "state": "Delhi"
}
```

### 2. Get Distance & Time

Calculate distance and estimated time between two locations.

**Endpoint:** `GET /maps/get-distance-time`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `origin`: Starting address
- `destination`: Ending address

**Example:**
```
GET /maps/get-distance-time?origin=Delhi&destination=Noida
```

**Success Response (200):**
```json
{
  "distance": 18500,
  "duration": 1800,
  "distanceInKm": "18.50",
  "durationInMinutes": "30.00"
}
```

**Note:** Uses OSRM (Open Source Routing Machine) for routing calculations.

### 3. Get Autocomplete Suggestions

Get location suggestions for autocomplete.

**Endpoint:** `GET /maps/get-suggestions`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `input`: Search query

**Example:**
```
GET /maps/get-suggestions?input=Delh
```

**Success Response (200):**
```json
[
  {
    "name": "Delhi",
    "country": "IN",
    "state": "Delhi",
    "lat": 28.6139,
    "lng": 77.2090,
    "description": "Delhi, Delhi, IN"
  },
  {
    "name": "New Delhi",
    "country": "IN",
    "state": "Delhi",
    "lat": 28.6304,
    "lng": 77.2177,
    "description": "New Delhi, Delhi, IN"
  }
]
```

---

## 🔌 Socket.IO Events

### Connection Setup

**Client connects to:**
```javascript
const socket = io('http://localhost:4000');
```

### Events from Client

#### 1. Join Event

Connect user/captain to their socket room.

```javascript
socket.emit('join', {
  userId: 'user123',
  userType: 'user' // or 'captain'
});
```

**What happens:**
- Updates user/captain document with socketId
- Enables targeted messaging

#### 2. Update Captain Location

Captain sends real-time location updates.

```javascript
socket.emit('updateCaptainLocation', {
  captainId: 'captain123',
  location: {
    ltd: 28.6139,  // latitude
    lng: 77.2090   // longitude
  }
});
```

**What happens:**
- Updates captain's location in database
- Can be used for real-time tracking (future feature)

### Events from Server

#### 1. newriderequest

Sent to nearby captains when user creates a ride.

**Event:** `newriderequest`

**Data:**
```javascript
{
  _id: 'ride123',
  user: {
    _id: 'user123',
    fullName: { firstName: 'John', lastName: 'Doe' },
    email: 'john@example.com'
  },
  pickupLocation: 'Connaught Place, New Delhi',
  dropoffLocation: 'Sector 18, Noida',
  fare: 450,
  distance: 18500,
  duration: 1800,
  vehicleType: 'car',
  status: 'pending'
}
```

**Triggered by:** User creating a ride request

#### 2. ride-confirmed

Sent to user when captain accepts the ride.

**Event:** `ride-confirmed`

**Data:**
```javascript
{
  _id: 'ride123',
  status: 'accepted',
  otp: '123456',
  captain: {
    _id: 'captain123',
    fullName: { firstName: 'Jane', lastName: 'Driver' },
    vehicle: {
      plate: 'ABC-1234',
      vehicleType: 'car',
      color: 'Red'
    }
  },
  user: { /* user details */ }
}
```

**Triggered by:** Captain confirming the ride

#### 3. ride-started

Sent to user when captain starts the ride.

**Event:** `ride-started`

**Data:**
```javascript
{
  _id: 'ride123',
  status: 'ongoing',
  startTime: '2026-03-08T10:30:00.000Z'
}
```

**Triggered by:** Captain starting ride after OTP verification

#### 4. ride-ended

Sent to user when ride is completed.

**Event:** `ride-ended`

**Data:**
```javascript
{
  rideId: 'ride123'
}
```

**Triggered by:** Captain ending the ride

---

## 📊 Database Models

### User Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3),
    lastName: String (required, min: 3)
  },
  email: String (required, unique, min: 5),
  password: String (required, hashed, not selected in queries),
  socketId: String (default: null)
}
```

**Methods:**
- `generateAuthToken()`: Creates JWT token (expires in 24h)
- `comparepassword(password)`: Compares plain password with hash
- `hashPassword(password)`: Static method to hash passwords

### Captain Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3),
    lastName: String (required, min: 3)
  },
  email: String (required, unique),
  password: String (required, min: 6),
  socketId: String (default: null),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  vehicle: {
    color: String (required),
    plate: String (required),
    capacity: Number (required, min: 1),
    vehicleType: String (enum: ['car', 'bike', 'auto'], required)
  },
  location: {
    ltd: Number,  // latitude
    lng: Number   // longitude
  }
}
```

**Methods:**
- `createToken()`: Creates JWT token (expires in 24h)
- `comparePassword(password)`: Compares plain password with hash
- `hashPassword(password)`: Static method to hash passwords

### Ride Model

```javascript
{
  user: ObjectId (ref: 'user', required),
  captain: ObjectId (ref: 'Captain'),
  pickupLocation: String (required),
  dropoffLocation: String (required),
  fare: Number (required),
  vehicleType: String (enum: ['auto', 'car', 'bike'], required),
  status: String (enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], default: 'pending'),
  duration: Number (in seconds),
  distance: Number (in meters),
  paymentID: String,
  orderID: String,
  signature: String,
  otp: String (required, not selected in queries)
}
```

### Blacklist Token Model

```javascript
{
  token: String (required, unique),
  createdAt: Date (expires after 24 hours via TTL)
}
```

---

## 🏗️ System Architecture

### How the Ride Flow Works

```
1. USER CREATES RIDE
   ↓
   POST /rides/create-ride
   ↓
   - Calculate fare using distance/time
   - Save ride to database
   - Get pickup coordinates
   - Find nearby captains (10km radius)
   ↓
   Socket: Emit "newriderequest" to all nearby captains
   
2. CAPTAIN ACCEPTS RIDE
   ↓
   POST /rides/confirm-ride
   ↓
   - Update ride status to "accepted"
   - Assign captain to ride
   ↓
   Socket: Emit "ride-confirmed" to user with OTP
   
3. CAPTAIN VERIFIES OTP & STARTS
   ↓
   GET /rides/start-ride?rideId=xxx&otp=123456
   ↓
   - Verify OTP matches
   - Update status to "ongoing"
   ↓
   Socket: Emit "ride-started" to user
   
4. CAPTAIN ENDS RIDE
   ↓
   POST /rides/end-ride
   ↓
   - Update status to "completed"
   - Record end time
   ↓
   Socket: Emit "ride-ended" to user
```

### Captain Discovery Algorithm

**Uses Haversine Formula to find nearby captains:**

```javascript
1. Get pickup location coordinates (lat, lng)
2. Query all active captains from database
3. For each captain:
   - Calculate distance using Haversine formula
   - Filter captains within specified radius (default: 10km)
4. Return filtered list of nearby captains
5. Send ride request to each via Socket.IO
```

**Haversine Formula:**
```javascript
R = 6371 // Earth's radius in km
dLat = toRadians(lat2 - lat1)
dLon = toRadians(lon2 - lon1)
a = sin(dLat/2)² + cos(lat1) * cos(lat2) * sin(dLon/2)²
c = 2 * atan2(√a, √(1−a))
distance = R * c
```

### Authentication Flow

```
1. User/Captain registers → Password hashed → Saved to DB
2. User/Captain logs in → Password compared → JWT generated
3. JWT stored in client (localStorage/cookie)
4. Protected routes → Middleware verifies JWT → Grants access
5. Logout → Token added to blacklist → Access revoked
```

---

## 🔐 Authentication & Security

### JWT Token Structure

```javascript
{
  header: {
    "alg": "HS256",
    "typ": "JWT"
  },
  payload: {
    "_id": "userId or captainId",
    "iat": 1234567890,
    "exp": 1234654290
  },
  signature: "HMACSHA256(...)"
}
```

### Middleware Protection

**Auth Middleware Flow:**
1. Extract token from headers or cookies
2. Check if token is blacklisted
3. Verify token signature
4. Decode user/captain ID
5. Fetch user/captain from database
6. Attach to `req.user` or `req.captain`
7. Call `next()`

**Protected Routes Example:**
```javascript
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.post('/confirm-ride', authMiddleware.authCaptain, rideController.confirmRide);
```

---

## 🧪 Testing the API

### Using cURL

**1. Register User**
```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {"firstName": "John", "lastName": "Doe"},
    "email": "john@test.com",
    "password": "password123"
  }'
```

**2. Login User**
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

**3. Create Ride** (Replace TOKEN)
```bash
curl -X POST http://localhost:4000/rides/create-ride \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "pickupLocation": "Connaught Place, New Delhi",
    "dropoffLocation": "Sector 18, Noida",
    "vehicleType": "car"
  }'
```

**4. Get Fare Estimate**
```bash
curl -X GET "http://localhost:4000/rides/get-fare?pickupLocation=Delhi&dropoffLocation=Noida" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. **Import Collection:**
   - Create a new collection named "Uber API"
   - Add environment variable: `baseUrl = http://localhost:4000`
   - Add environment variable: `token` (auto-set after login)

2. **Set Authorization:**
   - Type: Bearer Token
   - Token: `{{token}}`

3. **Test Flow:**
   - Register User → Save token
   - Register Captain → Save captain token
   - Create Ride (as user)
   - Confirm Ride (as captain)
   - Start Ride (as captain with OTP)
   - End Ride (as captain)

---

## 🐛 Common Issues & Solutions

### Issue 1: Captain not receiving ride requests

**Symptoms:** No `newriderequest` socket event

**Solutions:**
1. **Check captain location:**
   ```javascript
   // Captain must have location set
   db.captains.find({location: {$exists: true}})
   ```

2. **Check captain status:**
   ```javascript
   // Captain must be "active"
   db.captains.updateMany({}, {$set: {status: "active"}})
   ```

3. **Check socket connection:**
   - Browser console should show: "Connected to Socket.IO server"
   - Captain must emit `join` event with captainId

4. **Increase search radius:** (for testing)
   ```javascript
   // In ride.controller.js
   const captains = await mapService.getCaptainsNearby(
     pickupCoordinates.lat,
     pickupCoordinates.lng,
     100  // Increased from 10km to 100km
   );
   ```

### Issue 2: Geolocation errors

**Error:** "Invalid location data"

**Solutions:**
- Frontend must send `ltd` (not `lat`) for latitude
- Check captain model uses `location.ltd` and `location.lng`
- Browser must have geolocation permission enabled

### Issue 3: OTP verification fails

**Error:** "Invalid OTP"

**Solutions:**
- OTP is 6 digits, stored as string
- Check spaces: `otp.trim()` on both sides
- OTP only shown in queries with `.select('+otp')`

### Issue 4: MongoDB connection fails

**Error:** "MongooseServerSelectionError"

**Solutions:**
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas connection string
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/uber
```

---

## 📈 Performance Optimizations

1. **Database Indexing:**
   ```javascript
   // Add indexes for faster queries
   captainSchema.index({ status: 1, location: '2dsphere' });
   rideSchema.index({ status: 1, user: 1 });
   userSchema.index({ email: 1 });
   ```

2. **Socket.IO Rooms:**
   - Users join ride-specific rooms
   - Only emit to relevant users, not broadcast to all

3. **Background Processing:**
   - Captain notification runs async
   - Doesn't block ride creation response

4. **Token Blacklist Auto-Expiry:**
   - TTL index removes expired tokens automatically
   - Prevents database bloat

---

## 🚀 Deployment Checklist

### Environment Variables for Production

```env
PORT=4000
DB_CONNECT=mongodb+srv://user:pass@cluster.mongodb.net/uber
JWT_KEY=super_secret_random_string_min_32_chars
OPENWEATHERMAP_API_KEY=your_production_api_key
NODE_ENV=production
```

### Security Enhancements

1. **CORS Configuration:**
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }));
   ```

2. **Rate Limiting:**
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use('/api/', limiter);
   ```

3. **Helmet for Security Headers:**
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start server.js --name uber-backend

# Monitor
pm2 monit

# Logs
pm2 logs uber-backend

# Restart on file changes
pm2 restart uber-backend --watch
```

---

## 🛠️ Development Tools

### Recommended VS Code Extensions

- **REST Client** or **Thunder Client**: Test API endpoints
- **MongoDB for VS Code**: Browse database
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Useful Commands

```bash
# Check running processes
lsof -i :4000

# Kill process on port
kill -9 $(lsof -t -i:4000)

# MongoDB shell
mongosh

# View all collections
show collections

# Query rides
db.rides.find().pretty()

# Clear all data (DANGER!)
db.dropDatabase()
```

---

## 📝 API Response Patterns

### Success Response
```javascript
{
  "data": { /* result */ },
  "message": "Optional success message"
}
```

### Error Response
```javascript
{
  "error": "Error message" // string
  // OR
  "error": [ /* validation errors array */ ]
}
```

### HTTP Status Codes Used

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST (creation) |
| 400 | Bad Request | Validation errors |
| 401 | Unauthorized | Invalid/missing token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal errors |

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Socket.IO Documentation](https://socket.io/)
- [JWT.io](https://jwt.io/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [OSRM API Documentation](http://project-osrm.org/docs/v5.24.0/api/)

---

## 👥 Contributors

Backend implementation for Uber Clone ride-sharing application.

---

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using Node.js, Express, MongoDB, and Socket.IO**
