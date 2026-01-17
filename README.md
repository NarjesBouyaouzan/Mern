<<<<<<< HEAD
# 📚 LearnHub - MERN Online Learning Platform

A complete beginner-friendly MERN (MongoDB, Express, React, Node.js) application for an online learning platform. Built as an academic project suitable for university MERN examinations.

## 🎯 Project Overview

LearnHub is a full-stack educational platform where:
- **Students** can browse, enroll in, and view courses
- **Instructors** can create and manage courses with lessons
- **System** enforces role-based access control and secure authentication

## 🧱 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Joi** - Input validation
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Project Structure

```
LearnHub/
├── Backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   ├── jwt.js               # JWT utilities
│   │   ├── password.js          # Password hashing
│   │   └── validation.js        # Input validation schemas
│   ├── models/
│   │   ├── User.js              # User model (1-to-1 with Profile)
│   │   ├── Profile.js           # Profile model (extends User)
│   │   ├── Course.js            # Course model (1-to-Many with Lesson)
│   │   ├── Lesson.js            # Lesson model (Many-to-One with Course)
│   │   └── Enrollment.js        # Enrollment model (Many-to-Many)
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (register, login, getMe)
│   │   ├── courseController.js  # Course CRUD operations
│   │   ├── lessonController.js  # Lesson CRUD operations
│   │   └── enrollmentController.js # Enrollment operations
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── courseRoutes.js      # Course endpoints
│   │   ├── lessonRoutes.js      # Lesson endpoints
│   │   └── enrollmentRoutes.js  # Enrollment endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification & role checking
│   ├── server.js                # Express app & server startup
│   ├── package.json             # Dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore               # Git ignore rules
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Navigation bar
│   │   │   └── ProtectedRoute.jsx       # Route protection wrapper
│   │   ├── pages/
│   │   │   ├── HomePage.jsx             # Home/landing page
│   │   │   ├── LoginPage.jsx            # Login form
│   │   │   ├── RegisterPage.jsx         # Registration form
│   │   │   ├── CoursesPage.jsx          # Browse all courses
│   │   │   ├── CourseDetailsPage.jsx    # View course & lessons
│   │   │   ├── StudentDashboard.jsx     # Student's enrolled courses
│   │   │   └── InstructorDashboard.jsx  # Instructor's course management
│   │   ├── services/
│   │   │   ├── api.js                   # Axios instance with interceptors
│   │   │   ├── authService.js           # Auth API calls
│   │   │   ├── courseService.js         # Course API calls
│   │   │   └── enrollmentService.js     # Enrollment API calls
│   │   ├── App.jsx                      # Main React component
│   │   ├── main.jsx                     # React entry point
│   │   └── index.css                    # Global styles
│   ├── index.html                       # HTML entry point
│   ├── vite.config.js                   # Vite configuration
│   ├── tailwind.config.js               # Tailwind configuration
│   ├── postcss.config.js                # PostCSS configuration
│   ├── package.json                     # Dependencies
│   ├── .gitignore                       # Git ignore rules
│   └── .eslintrc.cjs                    # ESLint configuration
│
└── README.md                            # This file
```

## 🗄️ Database Models

### 1️⃣ User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['student', 'instructor']),
  createdAt: Date (auto)
}
```

### 2️⃣ Profile Model (1-to-1 with User)
```javascript
{
  userId: ObjectId (ref: User, unique),
  bio: String,
  avatar: String (URL),
  skills: [String],
  createdAt: Date
}
```

### 3️⃣ Course Model (Instructor has many Courses)
```javascript
{
  title: String (required),
  description: String (required),
  instructorId: ObjectId (ref: User, required),
  createdAt: Date
}
```

### 4️⃣ Lesson Model (Course has many Lessons)
```javascript
{
  title: String (required),
  content: String (required),
  courseId: ObjectId (ref: Course, required),
  order: Number,
  createdAt: Date
}
```

### 5️⃣ Enrollment Model (Many-to-Many: Students ↔ Courses)
```javascript
{
  userId: ObjectId (ref: User, required),
  courseId: ObjectId (ref: Course, required),
  createdAt: Date
}
// Unique constraint: userId + courseId (prevent duplicate enrollments)
```

## 🔗 Relationships

| Relationship | Type | Description |
|---|---|---|
| User ↔ Profile | 1-to-1 | One user has one profile |
| User (Instructor) → Course | 1-to-Many | One instructor creates many courses |
| Course → Lesson | 1-to-Many | One course contains many lessons |
| User (Student) ↔ Course | Many-to-Many | Many students enroll in many courses (via Enrollment) |

## 🌐 API Routes

### Authentication Routes
```
POST   /api/auth/register        # Register new user
POST   /api/auth/login           # Login user
GET    /api/auth/me              # Get current user (protected)
```

### Course Routes
```
POST   /api/courses              # Create course (instructor only)
GET    /api/courses              # Get all courses (public)
GET    /api/courses/:id          # Get course details with lessons (public)
PUT    /api/courses/:id          # Update course (instructor only)
DELETE /api/courses/:id          # Delete course (instructor only)
```

### Lesson Routes
```
POST   /api/lessons/:courseId    # Create lesson (instructor only)
GET    /api/lessons/course/:courseId  # Get course lessons (public)
PUT    /api/lessons/:id          # Update lesson (instructor only)
DELETE /api/lessons/:id          # Delete lesson (instructor only)
```

### Enrollment Routes
```
POST   /api/enrollments          # Enroll in course (student)
GET    /api/enrollments/user/:userId  # Get user enrollments (protected)
DELETE /api/enrollments/:enrollmentId # Unenroll from course (protected)
```

## 🔐 Authentication & Security

### Password Security
- Passwords hashed with **bcryptjs** (10 salt rounds)
- Never stored in plain text
- Verified during login

### JWT Tokens
- Token generated on successful login/registration
- Stored in **localStorage** on client
- Sent in Authorization header as `Bearer <token>`
- Verified by backend middleware
- Automatic logout on token expiration

### Protected Routes
- Student/Instructor dashboards require valid JWT
- Course creation/management restricted to instructors
- Users can only unenroll from their own enrollments

### Input Validation
- All inputs validated with **Joi** on backend
- Email format validation
- Password minimum length (6 characters)
- Required field checks

### CORS Configuration
- Restricted to frontend domain
- Credentials enabled for secure requests

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (local or MongoDB Atlas connection)
- **npm** or **yarn**

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`**
   ```
   MONGO_URI=mongodb://localhost:27017/learnhub
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

6. **Run backend server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder** (from project root)
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** (optional, if needed)
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Run frontend development server**
   ```bash
   npm run dev
   ```
   
   App will run on `http://localhost:5173`

## 🧪 Testing the Application

### 1. Register & Create Accounts
- Visit `http://localhost:5173/register`
- Create two accounts:
  - **Student account**: name, email, password, role = "student"
  - **Instructor account**: name, email, password, role = "instructor"

### 2. Test Instructor Features
- Login as instructor
- Go to **Instructor Dashboard**
- Click **Create New Course**
- Fill in title and description
- Course created successfully ✅

### 3. Test Student Features
- Login as student
- Go to **Browse Courses**
- Click on any course
- Click **Enroll Now**
- Go to **Student Dashboard** to see enrolled courses ✅

### 4. Test Protected Routes
- Logout
- Try accessing `/student-dashboard` → Redirected to login ✅
- Try accessing `/instructor-dashboard` → Redirected to login ✅

## 📊 Code Quality Features

✅ **MVC Architecture**
- Models define data structure
- Controllers handle business logic
- Routes define endpoints

✅ **Clear Comments**
- Every function documented with JSDoc
- Complex logic explained inline
- Purpose of each file clear

✅ **Error Handling**
- Try-catch blocks in async functions
- User-friendly error messages
- HTTP status codes correct

✅ **Security**
- Password hashing
- JWT authentication
- Role-based access control
- Input validation
- CORS enabled

✅ **Scalability**
- Modular structure (easy to add features)
- Service layer for API calls
- Reusable components

## 📝 Key Exam Points to Remember

### Relationships
- **1-to-1**: User ↔ Profile
- **1-to-Many**: User → Course, Course → Lesson
- **Many-to-Many**: User ↔ Course (via Enrollment junction table)

### Authentication Flow
1. User registers → Password hashed → User created → Token generated
2. User logs in → Password verified → Token generated → Stored in localStorage
3. API requests → Token in Authorization header → Middleware verifies → Request proceeds

### CRUD Operations
- **Create**: POST request with data
- **Read**: GET request by ID or all
- **Update**: PUT request with new data
- **Delete**: DELETE request removes resource

### Protected Routes
- Frontend: ProtectedRoute component checks localStorage token
- Backend: verifyJWT middleware checks Authorization header

## 🐛 Troubleshooting

| Issue | Solution |
|---|---|
| MongoDB connection error | Ensure MongoDB is running and MONGO_URI is correct |
| CORS error | Check FRONTEND_URL in backend .env matches frontend URL |
| Token not persisting | Check if localStorage is enabled in browser |
| npm install fails | Delete node_modules and package-lock.json, then reinstall |
| Port already in use | Change PORT in .env (backend) or modify Vite config (frontend) |

## 📚 Learning Resources

This project demonstrates:
- REST API design principles
- Database relationships (1-1, 1-many, many-many)
- JWT-based authentication
- Role-based access control
- React hooks (useState, useEffect)
- Component composition
- API integration with Axios
- Input validation with Joi
- Password security with bcryptjs
- Middleware in Express
