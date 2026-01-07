# 🏗️ LearnHub - Architecture & Flow Diagrams

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LEARNHUB PLATFORM                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐       ┌──────────────────────────┐
│     FRONTEND (React/Vite)   │       │   BACKEND (Express/Node) │
├─────────────────────────────┤       ├──────────────────────────┤
│                             │       │                          │
│ Pages:                      │       │ Routes:                  │
│ • HomePage                  │       │ • /api/auth              │
│ • LoginPage                 │       │ • /api/courses           │
│ • RegisterPage              │◄─────►│ • /api/lessons           │
│ • CoursesPage               │ Axios │ • /api/enrollments       │
│ • CourseDetailsPage         │ JSON  │                          │
│ • StudentDashboard          │       │ Controllers:             │
│ • InstructorDashboard       │       │ • authController         │
│                             │       │ • courseController       │
│ Components:                 │       │ • lessonController       │
│ • Navbar                    │       │ • enrollmentController   │
│ • ProtectedRoute            │       │                          │
│                             │       │ Middleware:              │
│ Services:                   │       │ • verifyJWT              │
│ • api.js                    │       │ • checkRole              │
│ • authService.js            │       │                          │
│ • courseService.js          │       │ Models:                  │
│ • enrollmentService.js      │       │ • User                   │
│                             │       │ • Profile                │
└─────────────────────────────┘       │ • Course                 │
         ▲                             │ • Lesson                 │
         │                             │ • Enrollment             │
    HTTP/HTTPS                         │                          │
         │                             │ Config:                  │
         │                             │ • database.js            │
         │                             │ • jwt.js                 │
┌────────┴─────────────────────────┐   │ • password.js            │
│      MONGODB (Database)          │   │ • validation.js          │
├──────────────────────────────────┤   └──────────────────────────┘
│                                  │
│ Collections:                     │
│ • users                          │
│ • profiles                       │
│ • courses                        │
│ • lessons                        │
│ • enrollments                    │
└──────────────────────────────────┘
```

---

## User Registration & Authentication Flow

```
START: User Registration Page
   │
   ├─► User fills form
   │   • Name: "John Doe"
   │   • Email: "john@example.com"
   │   • Password: "secure123"
   │   • Role: "student"
   │
   ├─► Frontend validates input
   │   • All fields required? ✓
   │   • Valid email format? ✓
   │   • Password length ≥ 6? ✓
   │
   ├─► POST /api/auth/register
   │
   ├─► Backend validates (Joi)
   │   • Fields present? ✓
   │   • Email format valid? ✓
   │
   ├─► Check email unique
   │   • Email exists? ✗ (proceed)
   │
   ├─► Hash password
   │   • Password + Salt → Hashed Password
   │   • Store hashed in DB
   │
   ├─► Create User document
   │   {
   │     _id: ObjectId,
   │     name: "John Doe",
   │     email: "john@example.com",
   │     password: "$2a$10$...", (hashed)
   │     role: "student"
   │   }
   │
   ├─► Create Profile document
   │   {
   │     userId: ObjectId,
   │     bio: "",
   │     avatar: "https://...",
   │     skills: []
   │   }
   │
   ├─► Generate JWT Token
   │   jwt.sign({ id: userId }, SECRET, { expiresIn: '7d' })
   │
   ├─► Return response
   │   {
   │     token: "eyJhbGciOiJIUzI1NiIs...",
   │     user: { id, name, email, role }
   │   }
   │
   ├─► Frontend stores token
   │   localStorage.setItem('token', token)
   │   localStorage.setItem('user', JSON.stringify(user))
   │
   ├─► Redirect to home
   │   window.location.href = '/'
   │
END: User logged in & authenticated
```

---

## API Request with Authentication

```
Frontend (App.jsx)
   │
   ├─► User action (e.g., "Browse Courses")
   │
   ├─► Axios API call
   │   GET /api/courses
   │
   ├─► Interceptor checks localStorage
   │   token = localStorage.getItem('token')
   │
   ├─► Add Authorization header
   │   headers: {
   │     Authorization: 'Bearer <token>'
   │   }
   │
   ├─► Send HTTP request
   │
   ├─► Backend receives request
   │
   ├─► Middleware: verifyJWT
   │   ├─► Extract token from header
   │   ├─► jwt.verify(token, SECRET)
   │   ├─► Token valid? ✓
   │   ├─► Decode → req.user = { id }
   │   └─► next() → proceed
   │
   ├─► Route handler (getAllCourses)
   │
   ├─► MongoDB query
   │   Course.find().populate('instructorId')
   │
   ├─► Return response
   │   {
   │     total: 5,
   │     courses: [...]
   │   }
   │
   ├─► Frontend receives response
   │
   ├─► Update React state
   │   setCourses(response.data.courses)
   │
   ├─► Re-render component
   │
END: Display courses on page
```

---

## Database Relationship: User → Course → Lesson

```
USER COLLECTION
┌─────────────────┐
│ _id: ObjectId   │  ◄─── Instructor
│ name: "Jane"    │
│ email: "jane@.."│
│ role: instructor│
└─────────────────┘
      │
      │ instructorId (FK)
      │
      ▼
COURSE COLLECTION
┌──────────────────────┐
│ _id: ObjectId        │
│ title: "JavaScript"  │
│ description: "..."   │
│ instructorId: <ref>  │  ◄─── Points to User
└──────────────────────┘
      │
      │ courseId (FK)
      │
      ▼ (Multiple lessons per course)
LESSON COLLECTION
┌──────────────────┐
│ _id: ObjectId    │
│ title: "Lesson 1"│
│ content: "..."   │
│ courseId: <ref>  │  ◄─── Points to Course
│ order: 1         │
└──────────────────┘

EXAMPLE QUERY (Get all lessons for a course):
db.lessons.find({ courseId: ObjectId("...") })
```

---

## Many-to-Many: Students ↔ Courses (via Enrollment)

```
STUDENT (User)                          COURSE
┌──────────────────┐                 ┌──────────────────┐
│ _id: ObjectId    │                 │ _id: ObjectId    │
│ name: "John"     │                 │ title: "Node"    │
│ role: student    │                 │ description: ".."│
└──────────────────┘                 └──────────────────┘
      │                                     ▲
      │ userId                              │ courseId
      │                                     │
      └──────────────────┬──────────────────┘
                         │
                    ENROLLMENT
                ┌──────────────────┐
                │ _id: ObjectId    │
                │ userId: <ref>    │
                │ courseId: <ref>  │
                │ createdAt: Date  │
                └──────────────────┘

EXAMPLE:
One student can be in many enrollments (many courses)
One course can have many enrollments (many students)

John enrolls in 3 courses:
┌─────────────────────────────────────────────────────┐
│ Enrollment 1: John → JavaScript Course              │
│ Enrollment 2: John → Python Course                  │
│ Enrollment 3: John → React Course                   │
└─────────────────────────────────────────────────────┘

JavaScript course has 10 students:
┌─────────────────────────────────────────────────────┐
│ Enrollment 1: John → JavaScript Course              │
│ Enrollment 2: Jane → JavaScript Course              │
│ Enrollment 3: Mike → JavaScript Course              │
│ ... (7 more)                                        │
└─────────────────────────────────────────────────────┘
```

---

## Role-Based Access Control Flow

```
STUDENT PATH:
User registers with role='student'
         │
         ├─► Can access:
         │   • /courses (browse)
         │   • /course/:id (details)
         │   • /student-dashboard (own enrollments)
         │
         ├─► Cannot access:
         │   • /instructor-dashboard (rejected)
         │   • POST /api/courses (403 Forbidden)
         │   • DELETE /api/courses/:id (403 Forbidden)
         │
         └─► Can perform:
             • POST /api/enrollments (enroll in course)
             • GET /api/enrollments/user/:id
             • DELETE /api/enrollments/:id

INSTRUCTOR PATH:
User registers with role='instructor'
         │
         ├─► Can access:
         │   • /courses (browse)
         │   • /course/:id (details)
         │   • /instructor-dashboard (manage courses)
         │
         ├─► Cannot access:
         │   • /student-dashboard (no enrollments)
         │   • POST /api/enrollments (403 Forbidden)
         │
         └─► Can perform:
             • POST /api/courses (create)
             • PUT /api/courses/:id (update own)
             • DELETE /api/courses/:id (delete own)
             • POST /api/lessons/:courseId
             • PUT /api/lessons/:id
             • DELETE /api/lessons/:id

VERIFICATION PROCESS:
Request → verifyJWT middleware
         │
         ├─► Token valid? ✓
         │   req.user = { id }
         │
         ├─► checkRole('instructor') middleware
         │   │
         │   ├─► Find User in DB
         │   ├─► Check user.role === 'instructor'
         │   ├─► If yes: next() → Proceed
         │   └─► If no: 403 Forbidden
         │
         └─► Controller handles request
```

---

## State Management Flow (Frontend)

```
USER AUTHENTICATION STATE

localStorage:
┌────────────────────────────────────┐
│ token: "eyJhbGciOi..."             │
│ user: {                            │
│   id: "...",                       │
│   name: "John",                    │
│   email: "john@...",               │
│   role: "student"                  │
│ }                                  │
└────────────────────────────────────┘

React State (Navbar.jsx):
const [user, setUser] = useState(
  JSON.parse(localStorage.getItem('user'))
)

Navigation Logic:
├─► user.id exists?
│   ├─► Yes: Show dashboard & logout button
│   └─► No: Show login & register buttons
│
└─► user.role === 'instructor'?
    ├─► Yes: Show instructor dashboard link
    └─► No: Show student dashboard link

Protected Route Logic (ProtectedRoute.jsx):
const token = localStorage.getItem('token')
├─► Token exists?
│   ├─► Yes: Render component
│   └─► No: Redirect to /login
```

---

## Error Handling Flow

```
USER MAKES REQUEST
         │
         ├─► Frontend validation
         │   • Empty fields? → Show error
         │   • Invalid email? → Show error
         │   • Password < 6 chars? → Show error
         │
         └─► Submit to backend
             │
             ├─► Joi validation
             │   • Invalid? → 400 Bad Request
             │   • Valid? → Continue
             │
             ├─► Business logic
             │   • Duplicate email? → 409 Conflict
             │   • Wrong password? → 401 Unauthorized
             │   • Unauthorized action? → 403 Forbidden
             │   • Resource not found? → 404 Not Found
             │
             ├─► Database error? → 500 Server Error
             │
             └─► Return error response
                 {
                   message: "Email already registered"
                 }

Frontend error handling:
│
├─► catch(error) block
│   • Extract error.response.data.message
│   • Display to user in error div
│   • Console.error for debugging
│
└─► User sees friendly error message
```

---

## Component Hierarchy

```
App (Router)
│
├─► Navbar (Always visible)
│   ├─► Check localStorage for user
│   ├─► Show user info if logged in
│   ├─► Show logout button if logged in
│   └─► Show login/register links if not logged in
│
├─► Routes
│   │
│   ├─► / (HomePage) - Public
│   ├─► /login (LoginPage) - Public
│   ├─► /register (RegisterPage) - Public
│   ├─► /courses (CoursesPage) - Public
│   ├─► /course/:id (CourseDetailsPage) - Public
│   │
│   ├─► /student-dashboard (Protected)
│   │   └─► ProtectedRoute
│   │       └─► StudentDashboard
│   │           └─► useEffect: fetch enrollments
│   │
│   └─► /instructor-dashboard (Protected)
│       └─► ProtectedRoute
│           └─► InstructorDashboard
│               └─► Form: create course
```

---

## Data Flow: Course Creation

```
Instructor fills course form
│
├─► Form state:
│   {
│     title: "Web Development",
│     description: "Learn web dev"
│   }
│
├─► Submit form → handleSubmit()
│
├─► POST /api/courses
│   Headers: { Authorization: Bearer token }
│
├─► Backend receives request
│
├─► verifyJWT middleware
│   req.user = { id: instructorId }
│
├─► checkRole('instructor') middleware
│   Verify user is instructor ✓
│
├─► createCourse controller
│   │
│   ├─► Validate input (Joi)
│   ├─► Create Course document
│   │   {
│   │     title: "Web Development",
│   │     description: "Learn web dev",
│   │     instructorId: req.user.id,
│   │     createdAt: Date.now()
│   │   }
│   ├─► Save to database
│   └─► Return success response
│
├─► Frontend receives response
│
├─► Show success message
│
└─► Clear form / Reset state
```

---

This visual guide helps understand the complete LearnHub architecture and flows!
