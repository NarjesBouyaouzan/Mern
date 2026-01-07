# 🚀 LearnHub - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies

#### Backend
```bash
cd Backend
npm install
```

#### Frontend
```bash
cd ../Frontend
npm install
```

---

### Step 2: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Update `MONGO_URI` in `Backend/.env` with your connection string

---

### Step 3: Run Backend

```bash
cd Backend
npm run dev
```

✅ Backend running on `http://localhost:5000`

---

### Step 4: Run Frontend (in another terminal)

```bash
cd Frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## 🧪 Test the App

### 1. Register as Student
- Go to `http://localhost:5173/register`
- Enter: Name, Email, Password (min 6 chars), Role = "student"
- Click Register
- Auto-login ✅

### 2. Register as Instructor
- Open new browser tab
- Go to `http://localhost:5173/register`
- Enter: Name, Email, Password, Role = "instructor"
- Click Register
- Auto-login ✅

### 3. Instructor: Create Course
- Click "Instructor Dashboard"
- Click "+ Create New Course"
- Enter: Title, Description
- Click "Create"
- Success message ✅

### 4. Student: Browse & Enroll
- Switch to student browser tab
- Click "Browse Courses"
- Click on the course you created
- Click "Enroll Now"
- Success message ✅
- Go to "Student Dashboard" → See enrolled course ✅

---

## 📁 Project Structure Summary

```
LearnHub/
├── Backend/           → Express API
│   ├── models/        → MongoDB schemas
│   ├── controllers/   → Business logic
│   ├── routes/        → API endpoints
│   ├── middleware/    → Authentication
│   └── server.js      → Start server
│
└── Frontend/          → React app
    ├── src/pages/     → Full pages
    ├── src/components/ → Reusable components
    ├── src/services/  → API calls
    └── App.jsx        → Main app
```

---

## 🔒 Key Features Implemented

✅ User Registration & Login (JWT)  
✅ Password Hashing (bcryptjs)  
✅ Role-Based Access (Student/Instructor)  
✅ 5 Database Models with Relationships  
✅ Secure API Routes  
✅ Protected Frontend Routes  
✅ Course Management  
✅ Lesson Management  
✅ Enrollment System  
✅ Tailwind CSS Styling  

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongod` |
| Port 5000 already in use | Change PORT in Backend/.env |
| Port 5173 already in use | Vite will use next available port |
| CORS error | Verify FRONTEND_URL in Backend/.env |
| npm install fails | Delete node_modules and package-lock.json, try again |

---

## 📚 Code Quality

- ✅ Clean MVC architecture
- ✅ Well-commented code
- ✅ Input validation
- ✅ Error handling
- ✅ Security best practices
- ✅ Modular structure

---

## 🎓 Learning Points

### Core MERN Concepts
1. **Models**: MongoDB schemas with relationships
2. **Controllers**: Business logic for API endpoints
3. **Routes**: RESTful API design
4. **Middleware**: JWT verification, role checking
5. **Frontend**: React hooks, routing, state management
6. **Authentication**: Secure login/registration flow
7. **Authorization**: Role-based access control
8. **Database**: 1-to-1, 1-to-many, many-to-many relationships

---

## 📝 For Exam Preparation

**Key Points to Explain:**

1. **Database Relationships**
   - User ↔ Profile (1-to-1)
   - User → Course (1-to-Many, Instructor)
   - Course → Lesson (1-to-Many)
   - User ↔ Course (Many-to-Many via Enrollment)

2. **Authentication Flow**
   - Password hashing → Token generation → localStorage storage
   - Token in Authorization header → Middleware verification

3. **API Design**
   - RESTful endpoints for CRUD
   - Proper HTTP status codes
   - Error handling

4. **Frontend Architecture**
   - Component-based structure
   - Router for navigation
   - API service layer
   - Protected routes

---

## ✅ Next Steps (Optional)

1. **Add Gemini AI Feature** (Generate course descriptions)
2. **Add Lesson Content** (Rich text editor)
3. **Add Comments** (Student feedback)
4. **Add Ratings** (Course reviews)
5. **Add Search** (Find courses)
6. **Add Notifications** (Email alerts) 

---

## 🎉 You're All Set!

Your complete MERN application is ready for:
- ✅ Learning and practice
- ✅ University exam demonstration
- ✅ Portfolio project
- ✅ Educational portfolio

**Happy coding!** 🚀
