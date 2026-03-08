# Riding System Frontend

A modern, responsive ride-sharing application frontend built with React, featuring real-time updates, live location tracking, and seamless user experience.

## 🚀 Tech Stack

- **Framework:** React 19.2.0
- **Build Tool:** Vite 8.0.0
- **Routing:** React Router DOM 7.13.0
- **Styling:** Tailwind CSS 4.2.0
- **Animations:** GSAP 3.14.2 with @gsap/react
- **HTTP Client:** Axios 1.13.5
- **Real-time Communication:** Socket.IO Client 4.8.3
- **Icons:** Remix Icon 4.9.1
- **Maps & Tracking:** Leaflet & React-Leaflet

## 📁 Project Structure

```
frontend/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, logos, static files
│   │
│   ├── components/              # Reusable UI components
│   │   ├── CaptainDetails.jsx       # Captain profile card
│   │   ├── ConfirmRide.jsx          # Ride confirmation panel for users
│   │   ├── LiveTracking.jsx         # Real-time map tracking with Leaflet
│   │   ├── LocationSearchPanel.jsx  # Location autocomplete search
│   │   ├── LookingForDriver.jsx     # Driver search animation
│   │   ├── OtpPanel.jsx             # OTP verification modal
│   │   ├── PopPup.jsx               # Ride request popup for captains
│   │   ├── TimeLinePanel.jsx        # Ride timeline display
│   │   ├── VehiclePanelOpen.jsx     # Vehicle selection panel
│   │   └── WaitingForDriver.jsx     # Waiting state for users
│   │
│   ├── context/                 # React Context providers
│   │   ├── CaptainContext.jsx       # Captain authentication state
│   │   ├── CaptainDataContext.js    # Captain profile data
│   │   ├── SocketContext.jsx        # Socket.IO connection
│   │   └── UserContext.jsx          # User authentication state
│   │
│   ├── pages/                   # Route pages/views
│   │   ├── CaptainHomePage.jsx      # Captain dashboard & ride requests
│   │   ├── CaptainLogin.jsx         # Captain login page
│   │   ├── CaptainProtectWrapper.jsx # Protected route for captains
│   │   ├── CaptainSignup.jsx        # Captain registration
│   │   ├── CustomerRequests.jsx     # Captain's ride history
│   │   ├── PickUpUser.jsx           # Live tracking for pickup
│   │   ├── RideConfirmation.jsx     # Captain's ride details view
│   │   ├── Riding.jsx               # Active ride view for users
│   │   ├── Start.jsx                # Landing page
│   │   ├── UserHomePage.jsx         # User dashboard & booking
│   │   ├── UserLogin.jsx            # User login page
│   │   ├── UserLogout.jsx           # User logout handler
│   │   ├── UserProtectWrapper.jsx   # Protected route for users
│   │   └── UserSignup.jsx           # User registration
│   │
│   ├── App.jsx                  # Main app component with routes
│   ├── main.jsx                 # App entry point
│   ├── App.css                  # Global styles
│   └── index.css                # Tailwind directives
│
├── .env                         # Environment variables
├── package.json                 # Dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── eslint.config.js             # ESLint rules
```

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running on `http://localhost:4000`

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the frontend folder:

```env
VITE_BASE_URL=http://localhost:4000
```

### 4. Run Development Server

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

---

## 🎯 Features Implemented

### User Features
- ✅ User registration and authentication
- ✅ Login with email and password
- ✅ Protected routes with automatic redirect
- ✅ Real-time ride booking
- ✅ Vehicle type selection (Auto, Car, Bike)
- ✅ Location autocomplete search
- ✅ Fare estimation before booking
- ✅ Live driver tracking on map
- ✅ Real-time ride status updates
- ✅ Ride confirmation with driver details
- ✅ Active ride view

### Captain Features
- ✅ Captain registration with vehicle details
- ✅ Login authentication
- ✅ Real-time ride request notifications
- ✅ Accept/reject ride requests
- ✅ View ride details (user info, pickup, dropoff)
- ✅ OTP verification to start rides
- ✅ Live tracking page for pickup
- ✅ Real-time location broadcasting
- ✅ Ride history and requests
- ✅ Captain profile display

### Real-time Features
- ✅ Socket.IO connection management
- ✅ Live ride request notifications
- ✅ Real-time ride status updates
- ✅ Captain location broadcasting (every 15s)
- ✅ Live map tracking with Leaflet
- ✅ Smooth marker animations
- ✅ Auto-updating ETA and distance

### UI/UX Features
- ✅ Responsive design (mobile-first)
- ✅ GSAP animations for panels
- ✅ Smooth transitions
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Interactive maps with custom markers
- ✅ Color-coded ride status

---

## 🧩 Components Documentation

### LiveTracking Component

**Purpose:** Real-time map tracking with driver location, pickup/dropoff markers, and route visualization.

**Location:** `src/components/LiveTracking.jsx`

**Features:**
- Interactive Leaflet map with OpenStreetMap tiles
- Custom markers (Blue: driver, Green: pickup, Red: dropoff)
- Real-time driver location updates via Socket.IO
- Smooth 50-step marker animation
- Dynamic route polyline
- Status bar with ETA and distance
- Auto-zoom to fit markers
- Driver info card with call/message buttons
- Legend for marker types

**Props:**
```javascript
<LiveTracking 
  rideId="ride123"
  pickupCoords={{ lat: 28.6139, lng: 77.2090 }}
  dropoffCoords={{ lat: 28.5355, lng: 77.3910 }}
/>
```

**Socket Events:**
- Emits: `joinRide` with rideId
- Listens: `driverLocationUpdate`, `rideStatusUpdate`, `etaUpdate`

### ConfirmRide Component

**Purpose:** User's ride confirmation panel with vehicle selection and fare display.

**Features:**
- Vehicle type selection (Auto, Car, Bike)
- Fare display for each vehicle type
- Pickup and dropoff locations
- Distance and time estimates
- Payment method selection
- Confirm booking button

### PopPup Component

**Purpose:** Captain's ride request notification popup.

**Features:**
- User profile display
- Pickup and dropoff locations
- Fare and distance information
- Accept/Ignore buttons
- Slide-up animation with GSAP
- Auto-navigate to RideConfirmation on accept

### OtpPanel Component

**Purpose:** Modal for captain to verify OTP and start ride.

**Features:**
- 6-digit OTP input
- Validation before submission
- Loading state during verification
- Error message display
- API call to start ride
- Auto-redirect to pickup page on success

### LocationSearchPanel Component

**Purpose:** Autocomplete location search for pickup/dropoff.

**Features:**
- Real-time search suggestions
- API integration with backend
- Click to select location
- Recent/favorite locations (planned)

### CaptainDetails Component

**Purpose:** Captain's profile card on homepage.

**Features:**
- Captain name and photo
- Vehicle details (type, plate, color)
- Earnings display
- Rating and reviews
- Active status indicator

---

## 📄 Pages Documentation

### User Pages

#### Start Page (`/`)
- Landing page with branding
- "Get Started" button
- Navigate to user/captain login

#### UserHomePage (`/user-home`)
- **Protected Route** (requires login)
- Location search with autocomplete
- Vehicle selection panel
- Fare display
- Book ride functionality
- Real-time socket connection
- Listens for ride confirmations

#### UserLogin (`/login`)
- Email and password form
- Form validation
- JWT token storage
- Auto-redirect to home on success

#### UserSignup (`/signup`)
- Registration form with name, email, password
- Form validation
- Automatic login after signup

#### Riding (`/riding`)
- Active ride view for users
- Live driver tracking
- Ride status display
- Driver contact options

### Captain Pages

#### CaptainHomePage (`/captain-home`)
- **Protected Route** (requires captain login)
- Captain profile card
- Real-time ride request listener
- Location update broadcaster (15s interval)
- Accept/reject ride popup
- Navigation to requests history

#### CaptainLogin (`/captain-login`)
- Email and password form
- JWT token storage
- Redirect to captain home

#### CaptainSignup (`/captain-signup`)
- Registration form with:
  - Name, email, password
  - Vehicle details (type, plate, color, capacity)
- Form validation
- Auto-login after signup

#### RideConfirmation (`/RideConfirmation`)
- **Protected Route**
- Full ride details display
- User information
- Pickup and dropoff locations
- Fare breakdown
- Call/Message buttons
- "Go to Pickup" button → Opens OTP panel

#### PickUpUser (`/pickup`)
- **Protected Route**
- **Live tracking map integration**
- Driver en route to pickup
- Real-time location updates
- Distance to pickup
- Timeline panel for ride details
- Navigate to customer location

#### CustomerRequests (`/requests`)
- Captain's ride history
- Past and pending requests
- Ride statistics

---

## 🔌 Context Providers

### SocketContext

**Purpose:** Global Socket.IO connection management.

**Provides:**
- `socket` - Socket.IO client instance
- Auto-connection on mount
- Event listeners for connect/disconnect

**Usage:**
```javascript
const { socket } = useContext(SocketContext);

socket.emit('join', { userId, userType: 'user' });
socket.on('ride-confirmed', handleRideConfirmed);
```

### UserContext

**Purpose:** User authentication state management.

**Provides:**
- `user` - Current user object
- `setUser` - Update user state
- Persisted across page reloads

### CaptainDataContext

**Purpose:** Captain profile data management.

**Provides:**
- `captain` - Captain profile object
- `setCaptain` - Update captain state
- Vehicle information
- Status and location

### CaptainContext

**Purpose:** Captain authentication state.

**Provides:**
- `captain` - Auth state
- `setCaptain` - Update auth state
- Token management

---

## 🗺️ Routing Structure

```javascript
<Routes>
  <Route path="/" element={<Start />} />
  
  {/* User Routes */}
  <Route path="/signup" element={<UserSignup />} />
  <Route path="/login" element={<UserLogin />} />
  <Route path="/user-home" element={
    <UserProtectWrapper>
      <UserHomePage />
    </UserProtectWrapper>
  } />
  <Route path="/user/logout" element={
    <UserProtectWrapper>
      <UserLogout />
    </UserProtectWrapper>
  } />
  <Route path="/riding" element={<Riding />} />
  
  {/* Captain Routes */}
  <Route path="/captain-signup" element={<CaptainSignup />} />
  <Route path="/captain-login" element={<CaptainLogin />} />
  <Route path="/captain-home" element={
    <CaptainProtectWrapper>
      <CaptainHomePage />
    </CaptainProtectWrapper>
  } />
  <Route path="/RideConfirmation" element={
    <CaptainProtectWrapper>
      <RideConfirmation />
    </CaptainProtectWrapper>
  } />
  <Route path="/pickup" element={
    <CaptainProtectWrapper>
      <PickUpUser />
    </CaptainProtectWrapper>
  } />
  <Route path="/requests" element={
    <CaptainProtectWrapper>
      <CustomerRequests />
    </CaptainProtectWrapper>
  } />
</Routes>
```

---

## 🔄 Real-time Flow

### User Booking Flow

```
1. User enters pickup and dropoff locations
   ↓
2. Frontend calls API: GET /rides/get-fare
   ↓
3. Display fare for each vehicle type
   ↓
4. User selects vehicle and confirms
   ↓
5. Frontend calls API: POST /rides/create-ride
   ↓
6. Backend notifies nearby captains via Socket
   ↓
7. User sees "Looking for driver" animation
   ↓
8. Captain accepts ride
   ↓
9. Socket Event: "ride-confirmed" → User receives driver details
   ↓
10. User sees driver info and OTP
```

### Captain Ride Acceptance Flow

```
1. Captain on homepage with geolocation enabled
   ↓
2. Location sent to backend every 15 seconds
   ↓
3. User creates ride
   ↓
4. Socket Event: "newriderequest" → Captain receives popup
   ↓
5. Captain clicks "Accept"
   ↓
6. Frontend calls API: POST /rides/confirm-ride
   ↓
7. Navigate to /RideConfirmation page
   ↓
8. Captain clicks "Go to Pickup"
   ↓
9. OTP panel appears
   ↓
10. Captain enters OTP from user
   ↓
11. API: GET /rides/start-ride?rideId=xxx&otp=123456
   ↓
12. Navigate to /pickup with live tracking
   ↓
13. Captain location broadcasts to user in real-time
```

### Live Tracking Flow

```
1. CaptainHomePage emits location every 15s:
   socket.emit('updateCaptainLocation', {
     captainId, 
     location: { ltd, lng }
   })
   ↓
2. Backend updates captain location in DB
   ↓
3. Backend emits to ride room:
   socket.emit('driverLocationUpdate', { location })
   ↓
4. LiveTracking component receives update
   ↓
5. Marker animates smoothly to new position (50 steps)
   ↓
6. Map auto-zooms to fit driver and pickup
   ↓
7. Route polyline updates
```

---

## 🎨 Animations

### GSAP Animations Used

**Panel Slide-Up:**
```javascript
gsap.to(panelRef.current, {
  y: "0%",
  duration: 0.5,
  ease: "power3.out"
});
```

**Panel Slide-Down:**
```javascript
gsap.to(panelRef.current, {
  y: "100%",
  duration: 0.5,
  ease: "power3.in"
});
```

**Marker Animation:**
```javascript
// Smooth 50-step transition for driver marker
const animateMarker = (from, to) => {
  const steps = 50;
  const latStep = (to.lat - from.lat) / steps;
  const lngStep = (to.lng - from.lng) / steps;
  // Interpolate position over 1 second
};
```

---

## 🛠️ API Integration

### Axios Configuration

**Base URL:** Set via environment variable

```javascript
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
```

### Authentication Headers

```javascript
const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
```

### Common API Calls

**User Login:**
```javascript
const response = await axios.post('/users/login', {
  email,
  password
});
localStorage.setItem('token', response.data.token);
```

**Create Ride:**
```javascript
const response = await axios.post('/rides/create-ride', {
  pickupLocation,
  dropoffLocation,
  vehicleType
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```

**Confirm Ride (Captain):**
```javascript
const response = await axios.post('/rides/confirm-ride', {
  rideId
}, {
  headers: { Authorization: `Bearer ${captainToken}` }
});
```

---

## 🔐 Protected Routes

### UserProtectWrapper

**Purpose:** Protect user-only routes.

**Logic:**
1. Check for user token in localStorage
2. If no token → Redirect to `/login`
3. If token exists → Fetch user profile
4. Store user in context
5. Render children

### CaptainProtectWrapper

**Purpose:** Protect captain-only routes.

**Logic:**
1. Check for captain token
2. If no token → Redirect to `/captain-login`
3. If token exists → Fetch captain profile
4. Store captain in context
5. Render children

---

## 🎨 Styling with Tailwind CSS

### Custom Classes Used

**Common Patterns:**
```css
/* Card */
.shadow-lg .rounded-lg .p-4 .bg-white

/* Button Primary */
.bg-yellow-300 .text-black .py-2 .px-4 .rounded-lg .hover:bg-yellow-400

/* Button Secondary */
.bg-gray-200 .text-gray-700 .py-2 .px-4 .rounded-lg

/* Status Badge */
.bg-green-300 .text-xs .rounded-lg .p-1

/* Input Field */
.border-2 .border-gray-300 .rounded-lg .px-4 .py-2 .focus:border-yellow-400
```

### Responsive Design

- Mobile-first approach
- `h-screen` for full-height pages
- Flexbox for layouts
- `overflow-hidden` to prevent scroll issues

---

## 🐛 Troubleshooting

### Issue 1: Socket not connecting

**Symptoms:** No real-time updates

**Solutions:**
```javascript
// Check .env file
VITE_BASE_URL=http://localhost:4000

// Browser console should show:
"Connected to Socket.IO server"

// Check SocketContext.jsx import in main.jsx
import SocketContext from "./context/SocketContext.jsx";
```

### Issue 2: Maps not loading

**Symptoms:** Blank map or markers not showing

**Solutions:**
```bash
# Install Leaflet dependencies
npm install leaflet react-leaflet

# Import CSS in LiveTracking.jsx
import 'leaflet/dist/leaflet.css';

# Check marker icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
```

### Issue 3: Protected routes not working

**Symptoms:** Infinite redirect loop

**Solutions:**
```javascript
// Check token exists
localStorage.getItem('token')

// Check API endpoint is correct
axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`)

// Clear localStorage and login again
localStorage.clear()
```

### Issue 4: Geolocation permission denied

**Symptoms:** Captain location not updating

**Solutions:**
- Browser Settings → Privacy → Location → Allow
- Use HTTPS in production (required for geolocation)
- Check browser console for permission errors

### Issue 5: CORS errors

**Symptoms:** API calls fail with CORS error

**Solutions:**
```javascript
// Backend must have CORS enabled
app.use(cors({ origin: 'http://localhost:5173' }));

// Or allow all origins in development
app.use(cors({ origin: '*' }));
```

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

**Output:** `dist/` folder with optimized files

### Environment Variables for Production

```env
VITE_BASE_URL=https://your-backend-domain.com
```

### Deployment Options

**1. Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**2. Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**3. Static Hosting:**
- Upload `dist/` folder to any static host
- Configure redirects for SPA routing

### Nginx Configuration (for SPA)

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/uber-frontend/dist;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

---

## 🧪 Testing

### Manual Testing Checklist

**User Flow:**
- [ ] Register new user
- [ ] Login with credentials
- [ ] Search pickup location
- [ ] Search dropoff location
- [ ] View fare estimates
- [ ] Select vehicle type
- [ ] Confirm booking
- [ ] Receive ride confirmation
- [ ] See driver details
- [ ] View live tracking

**Captain Flow:**
- [ ] Register new captain with vehicle
- [ ] Login with credentials
- [ ] Grant location permission
- [ ] Receive ride request
- [ ] View ride details
- [ ] Accept ride request
- [ ] See user information
- [ ] Enter OTP
- [ ] View live tracking to pickup
- [ ] Location broadcasts every 15s

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 not supported

---

## 📊 Performance Optimizations

### Code Splitting

Vite automatically code-splits routes for faster loading.

### Image Optimization

```javascript
// Use WebP format for images
// Lazy load images below the fold
<img loading="lazy" src="..." />
```

### Socket Optimization

```javascript
// Disconnect socket on unmount
useEffect(() => {
  return () => {
    socket.disconnect();
  };
}, []);
```

### Map Performance

```javascript
// Update location max every 15s, not on every GPS tick
const intervalId = setInterval(updateLocation, 15000);
```

---

## 🔧 Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR. Changes appear without full page reload.

### Environment Variables

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_BASE_URL;
```

### Debugging

```javascript
// React DevTools for component debugging
// Redux DevTools (if using Redux)
// Browser console for API calls and Socket events

console.log('Socket event:', data);
console.log('API response:', response.data);
```

### Useful Commands

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update

# Lint code
npm run lint
```

---

## 📚 Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI library |
| react-router-dom | 7.13.0 | Client-side routing |
| socket.io-client | 4.8.3 | Real-time communication |
| axios | 1.13.5 | HTTP requests |
| tailwindcss | 4.2.0 | Utility-first CSS |
| gsap | 3.14.2 | Animations |
| leaflet | latest | Interactive maps |
| react-leaflet | latest | React wrapper for Leaflet |
| remixicon | 4.9.1 | Icon library |
| vite | 8.0.0-beta.13 | Build tool |

---

## 🚀 Future Enhancements

- [ ] Ride history for users
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Ratings and reviews
- [ ] Chat between user and captain
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Offline mode support
- [ ] Progressive Web App (PWA)
- [ ] Analytics dashboard

---

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using React, Vite, Socket.IO, and Leaflet**
