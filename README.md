# Voting App - Backend-Frontend Integration

This is a complete voting application with an integrated backend (Node.js/Express) and frontend (React/Vite).

## Features

- **Authentication System**: JWT-based authentication with login/signup
- **Role-based Access Control**: Admin and User roles with different permissions
- **Protected Routes**: Frontend routes protected by authentication
- **Election Management**: Create, view, and manage elections (Admin only)
- **Voting System**: Users can vote in elections
- **Real-time Updates**: Live results and election status

## Architecture

### Backend (Node.js/Express)
- **Port**: 5000
- **Database**: MongoDB
- **Authentication**: JWT tokens
- **CORS**: Configured for frontend communication

### Frontend (React/Vite)
- **Port**: 5173
- **State Management**: React Context for authentication
- **Routing**: React Router with protected routes
- **UI**: Tailwind CSS for styling

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation & Setup

1. **Clone and navigate to the project**
```bash
cd C:\Users\91955\OneDrive\Desktop\voting_app
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Environment Setup**
Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voting_app
JWT_SECRET=your_jwt_secret_here
```

5. **Start the application**
```bash
# Option 1: Use the batch file (recommended)
.\start-dev.bat

# Option 2: PowerShell script
.\start-dev.ps1

# Option 3: Manual start (most reliable)
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
cd client
npm run dev

# Option 4: Get manual instructions
.\start-manual.bat
```

## API Integration

### Authentication API
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `PUT /profile/password` - Change password (protected)

### Election API
- `GET /election` - Get all elections
- `GET /election/:id` - Get election details
- `POST /election` - Create election (admin only)
- `POST /election/:id/candidate` - Add candidate (admin only)
- `POST /election/:id/vote/:candidateIndex` - Vote in election (protected)
- `GET /election/:id/result` - Get election results

### Frontend API Service
Located in `client/src/utils/api.js`, this service handles:
- HTTP requests with proper headers
- JWT token management
- Error handling
- Response processing

### Authentication Context
Located in `client/src/contexts/AuthContext.jsx`, provides:
- Global authentication state
- Login/logout functionality
- User profile management
- Token persistence

## File Structure

```
voting_app/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── contexts/         # React contexts
│   │   └── utils/            # API service and utilities
│   ├── package.json
│   └── vite.config.js
├── models/                   # MongoDB models
├── routes/                   # Express routes
├── server.js                 # Main server file
├── package.json
└── .env                      # Environment variables
```

## Key Integration Points

1. **CORS Configuration**: Backend allows frontend origin (localhost:5173)
2. **JWT Token Handling**: Automatic token attachment to authenticated requests
3. **Protected Routes**: Frontend routes require authentication
4. **Error Handling**: Consistent error responses between backend and frontend
5. **State Management**: User state persisted across browser sessions

## Usage

### For Users
1. Sign up or login
2. View available elections
3. Vote in elections
4. View election results
5. Manage profile

### For Admins
1. All user features plus:
2. Create new elections
3. Add candidates to elections
4. Manage election settings
5. View admin dashboard

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 5173
- JWT tokens stored in localStorage
- Automatic token refresh on app start
- Role-based UI rendering
- Responsive design with Tailwind CSS

## Troubleshooting

1. **CORS Errors**: Ensure backend CORS is configured for localhost:5173
2. **Authentication Issues**: Check JWT token in browser localStorage
3. **API Errors**: Verify backend is running on port 5000
4. **Database Connection**: Ensure MongoDB is running and accessible

## Next Steps

- Add email verification
- Implement password reset
- Add election scheduling
- Implement real-time notifications
- Add candidate profiles
- Implement vote encryption
