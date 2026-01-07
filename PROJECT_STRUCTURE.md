# 📁 LearnHub - Complete Project Structure

## Full Directory Tree

```
LearnHub/
│
├── 📄 README.md                           ← PROJECT DOCUMENTATION
├── 📄 QUICK_START.md                      ← 5-MINUTE SETUP GUIDE
├── 📄 ARCHITECTURE.md                     ← FLOW DIAGRAMS & VISUAL GUIDES
├── 📄 COMPLETION_SUMMARY.md               ← PROJECT SUMMARY
├── 📄 rapport.pdf                         ← TECHNICAL REPORT
│
├── 📁 Backend/                            ← NODE.JS + EXPRESS API
│   │
│   ├── 📁 config/                         ← Configuration Files
│   │   ├── database.js                    ✓ MongoDB connection
│   │   ├── jwt.js                         ✓ JWT token utilities
│   │   ├── password.js                    ✓ Password hashing & comparison
│   │   └── validation.js                  ✓ Joi validation schemas
│   │
│   ├── 📁 models/                         ← MongoDB Schemas (5)
│   │   ├── User.js                        ✓ User model (auth)
│   │   ├── Profile.js                     ✓ Profile model (1-to-1 User)
│   │   ├── Course.js                      ✓ Course model (instructor)
│   │   ├── Lesson.js                      ✓ Lesson model (course content)
│   │   └── Enrollment.js                  ✓ Enrollment model (many-to-many)
│   │
│   ├── 📁 controllers/                    ← Business Logic (4)
│   │   ├── authController.js              ✓ Register, Login, GetMe
│   │   ├── courseController.js            ✓ Course CRUD operations
│   │   ├── lessonController.js            ✓ Lesson CRUD operations
│   │   └── enrollmentController.js        ✓ Enrollment operations
│   │
│   ├── 📁 routes/                         ← API Endpoints (4)
│   │   ├── authRoutes.js                  ✓ /api/auth/* routes
│   │   ├── courseRoutes.js                ✓ /api/courses/* routes
│   │   ├── lessonRoutes.js                ✓ /api/lessons/* routes
│   │   └── enrollmentRoutes.js            ✓ /api/enrollments/* routes
│   │
│   ├── 📁 middleware/                     ← Authentication & Authorization
│   │   └── auth.js                        ✓ verifyJWT, checkRole middleware
│   │
│   ├── 📄 server.js                       ✓ Express app & server startup
│   ├── 📄 package.json                    ✓ Dependencies (express, mongoose, jwt, bcryptjs, etc.)
│   ├── 📄 .env                            ✓ Environment variables (ready to use)
│   ├── 📄 .env.example                    ✓ Environment template
│   └── 📄 .gitignore                      ✓ Git ignore rules
│
└── 📁 Frontend/                           ← REACT + VITE
    │
    ├── 📁 src/                            ← Source Code
    │   │
    │   ├── 📁 pages/                      ← 7 Main Pages
    │   │   ├── HomePage.jsx               ✓ Landing page
    │   │   ├── LoginPage.jsx              ✓ User login
    │   │   ├── RegisterPage.jsx           ✓ User registration
    │   │   ├── CoursesPage.jsx            ✓ Browse all courses
    │   │   ├── CourseDetailsPage.jsx      ✓ Course details & enroll
    │   │   ├── StudentDashboard.jsx       ✓ Student enrolled courses
    │   │   └── InstructorDashboard.jsx    ✓ Instructor manage courses
    │   │
    │   ├── 📁 components/                 ← 2 Reusable Components
    │   │   ├── Navbar.jsx                 ✓ Navigation & user menu
    │   │   └── ProtectedRoute.jsx         ✓ Route authentication wrapper
    │   │
    │   ├── 📁 services/                   ← API Communication (4 files)
    │   │   ├── api.js                     ✓ Axios instance with interceptors
    │   │   ├── authService.js             ✓ Auth API calls
    │   │   ├── courseService.js           ✓ Course API calls
    │   │   └── enrollmentService.js       ✓ Enrollment API calls
    │   │
    │   ├── 📄 App.jsx                     ✓ Main app component & routing
    │   ├── 📄 main.jsx                    ✓ React entry point
    │   └── 📄 index.css                   ✓ Global styles & Tailwind imports
    │
    ├── 📁 public/                         ← Static Assets
    │
    ├── 📄 index.html                      ✓ HTML entry point
    ├── 📄 package.json                    ✓ Dependencies (react, vite, tailwind, axios, etc.)
    ├── 📄 vite.config.js                  ✓ Vite configuration
    ├── 📄 tailwind.config.js              ✓ Tailwind CSS configuration
    ├── 📄 postcss.config.js               ✓ PostCSS configuration
    ├── 📄 .eslintrc.cjs                   ✓ ESLint configuration
    └── 📄 .gitignore                      ✓ Git ignore rules
```

---

## File Count Summary

| Category | Count | Details |
|----------|-------|---------|
| **Backend Files** | 22 | config (4), models (5), controllers (4), routes (4), middleware (1), root (4) |
| **Frontend Files** | 20+ | pages (7), components (2), services (4), config (7) |
| **Documentation** | 5 | README, QUICK_START, ARCHITECTURE, COMPLETION_SUMMARY, rapport |
| **TOTAL** | 50+ | Complete MERN project |

---

## Key File Purposes

### Backend Configuration
```
database.js       → Connect to MongoDB
jwt.js            → Generate & verify JWT tokens
password.js       → Hash & compare passwords (bcryptjs)
validation.js     → Input validation schemas (Joi)
```

### Backend Models
```
User.js           → User with name, email, password, role
Profile.js        → Extended user info (1-to-1 relationship)
Course.js         → Course with title, description, instructor
Lesson.js         → Lesson content within course
Enrollment.js     → Student enrollment in courses (junction table)
```

### Backend Controllers
```
authController.js → Handle registration, login, getMe
courseController.js → Handle course CRUD operations
lessonController.js → Handle lesson CRUD operations
enrollmentController.js → Handle student enrollments
```

### Backend Routes
```
authRoutes.js     → POST /register, POST /login, GET /me
courseRoutes.js   → GET /courses, POST/PUT/DELETE /courses/:id
lessonRoutes.js   → POST/PUT/DELETE /lessons, GET by course
enrollmentRoutes.js → POST enroll, GET enrollments, DELETE unenroll
```

### Frontend Pages
```
HomePage.jsx      → Welcome page with features
LoginPage.jsx     → User login form
RegisterPage.jsx  → User registration form (choose role)
CoursesPage.jsx   → Browse all courses
CourseDetailsPage.jsx → View course, lessons, enroll button
StudentDashboard.jsx → View enrolled courses
InstructorDashboard.jsx → Create new course form
```

### Frontend Services
```
api.js            → Axios instance with JWT interceptor
authService.js    → register, login, getMe API calls
courseService.js  → Get courses, create, update, delete
enrollmentService.js → Enroll, get enrollments, unenroll
```

---

## Technology Stack Used

### Backend
```
Node.js           → JavaScript runtime
Express.js 4.18   → Web framework
MongoDB           → NoSQL database
Mongoose 8.0      → ODM for MongoDB
jsonwebtoken 9.1  → JWT authentication
bcryptjs 2.4      → Password hashing
joi 17.11         → Input validation
cors 2.8          → Cross-origin requests
dotenv 16.3       → Environment variables
```

### Frontend
```
React 18          → UI library
Vite 5.0          → Build tool & dev server
React Router 6.20 → Client-side routing
Axios 1.6         → HTTP client
Tailwind CSS 3.3  → Utility-first CSS
```

---

## Implementation Completeness

### ✅ All Requirements Met

**Database**
- ✅ 5 Models (User, Profile, Course, Lesson, Enrollment)
- ✅ 1-to-1 Relationship (User ↔ Profile)
- ✅ 1-to-Many Relationships (User→Course, Course→Lesson)
- ✅ Many-to-Many Relationship (User ↔ Course via Enrollment)

**Authentication**
- ✅ User registration with role selection
- ✅ User login with password verification
- ✅ JWT token generation (7-day expiry)
- ✅ Token storage in localStorage
- ✅ Protected API routes
- ✅ Protected React routes
- ✅ Password hashing (bcryptjs)

**API Endpoints**
- ✅ 13+ REST endpoints
- ✅ Auth (register, login, me)
- ✅ Courses (CRUD + list)
- ✅ Lessons (CRUD by course)
- ✅ Enrollments (enroll, unenroll, list)

**Frontend**
- ✅ 7 main pages
- ✅ 2 reusable components
- ✅ React Router navigation
- ✅ Axios API integration
- ✅ Protected routes
- ✅ Tailwind CSS styling
- ✅ Form validation
- ✅ Loading & error states

**Security**
- ✅ JWT authentication
- ✅ Password hashing
- ✅ Input validation
- ✅ CORS enabled
- ✅ Role-based access
- ✅ Environment variables
- ✅ Token verification

**Documentation**
- ✅ README (2500+ lines)
- ✅ QUICK_START guide
- ✅ ARCHITECTURE guide with diagrams
- ✅ COMPLETION_SUMMARY
- ✅ Technical rapport
- ✅ Code comments

---

## How Each File Works Together

```
USER REGISTRATION FLOW
│
├─► Frontend: RegisterPage.jsx (user fills form)
│
├─► Frontend: authService.js (calls API)
│   └─► POST /api/auth/register
│
├─► Backend: server.js (Express app)
│   └─► Routes to authRoutes.js
│
├─► Backend: authRoutes.js (routes to controller)
│   └─► Calls authController.register()
│
├─► Backend: authController.js (validates & processes)
│   ├─► Validates input with validation.js (Joi)
│   ├─► Hashes password with password.js (bcryptjs)
│   ├─► Saves to User model (MongoDB)
│   ├─► Saves to Profile model (MongoDB)
│   ├─► Generates token with jwt.js
│   └─► Returns response
│
├─► Frontend: api.js (interceptor stores token)
│   └─► localStorage.setItem('token', token)
│
├─► Frontend: App.jsx checks localStorage
│   └─► Navbar.jsx shows user info
│
└─► User logged in & authenticated ✓
```

---

## File Dependencies

```
server.js
├─► config/database.js (MongoDB connection)
├─► routes/authRoutes.js
│   └─► controllers/authController.js
│       ├─► models/User.js
│       ├─► models/Profile.js
│       ├─► config/password.js
│       ├─► config/jwt.js
│       └─► config/validation.js
├─► routes/courseRoutes.js
│   └─► controllers/courseController.js
│       └─► models/Course.js
├─► routes/lessonRoutes.js
│   └─► controllers/lessonController.js
│       └─► models/Lesson.js
├─► routes/enrollmentRoutes.js
│   └─► controllers/enrollmentController.js
│       └─► models/Enrollment.js
└─► middleware/auth.js
    └─► config/jwt.js
```

---

## Deployment Ready Features

✅ Environment variables (.env)
✅ Error handling
✅ Input validation
✅ Security measures
✅ Modular structure
✅ Clean code
✅ Comments & documentation

---

## Ready to Use!

All files are:
- ✅ Created & organized
- ✅ Properly commented
- ✅ Fully functional
- ✅ Following best practices
- ✅ Ready to run
- ✅ Ready to modify
- ✅ Ready to extend

Just follow the **QUICK_START.md** to get running in 5 minutes! 🚀
