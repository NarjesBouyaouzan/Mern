
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

// Load models
import User from './models/User.js';
import Course from './models/Course.js';
import Lesson from './models/Lesson.js';
import Enrollment from './models/Enrollment.js';
import Profile from './models/Profile.js';

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
    STUDENT_COUNT: 10,
    INSTRUCTOR_COUNT: 3,
    COURSES_PER_INSTRUCTOR: 2,
    LESSONS_PER_COURSE: 5,
    ENROLLMENTS_PER_STUDENT: 2,
};

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learnhub');
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// Helper: Clear all data
const clearData = async () => {
    console.log('🗑️  Clearing all data...');
    await Promise.all([
        User.deleteMany({}),
        Course.deleteMany({}),
        Lesson.deleteMany({}),
        Enrollment.deleteMany({}),
        Profile.deleteMany({}),
    ]);
    console.log('✅ Data cleared');
};

// Helper: Seed Users
const seedUsers = async () => {
    console.log('👥 Seeding Users...');
    const students = [];
    const instructors = [];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Students
    for (let i = 0; i < CONFIG.STUDENT_COUNT; i++) {
        const student = new User({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: hashedPassword,
            role: 'student',
        });
        students.push(student);
    }

    // Create Instructors
    for (let i = 0; i < CONFIG.INSTRUCTOR_COUNT; i++) {
        const instructor = new User({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: hashedPassword,
            role: 'instructor',
        });
        instructors.push(instructor);
    }

    const createdStudents = await User.insertMany(students);
    const createdInstructors = await User.insertMany(instructors);

    console.log(`✅ Created ${createdStudents.length} students`);
    console.log(`✅ Created ${createdInstructors.length} instructors`);

    return { students: createdStudents, instructors: createdInstructors };
};

// Helper: Seed Profiles
const seedProfiles = async (users) => {
    console.log('👤 Seeding Profiles...');
    const profiles = users.map((user) => ({
        userId: user._id,
        bio: faker.person.bio(),
        avatar: faker.image.avatar(),
        skills: [faker.word.sample(), faker.word.sample(), faker.word.sample()],
    }));

    await Profile.insertMany(profiles);
    console.log(`✅ Created ${profiles.length} profiles`);
};

// Helper: Seed Courses
const seedCourses = async (instructors) => {
    console.log('📚 Seeding Courses...');
    const courses = [];

    for (const instructor of instructors) {
        for (let i = 0; i < CONFIG.COURSES_PER_INSTRUCTOR; i++) {
            courses.push(new Course({
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraphs(2),
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
                instructorId: instructor._id,
            }));
        }
    }

    const createdCourses = await Course.insertMany(courses);
    console.log(`✅ Created ${createdCourses.length} courses`);
    return createdCourses;
};

// Helper: Seed Lessons
const seedLessons = async (courses) => {
    console.log('📝 Seeding Lessons...');
    const lessons = [];

    for (const course of courses) {
        for (let i = 0; i < CONFIG.LESSONS_PER_COURSE; i++) {
            lessons.push(new Lesson({
                title: `Lesson ${i + 1}: ${faker.hacker.verb()} ${faker.hacker.noun()}`,
                content: faker.lorem.paragraphs(3),
                courseId: course._id,
                order: i + 1,
            }));
        }
    }

    await Lesson.insertMany(lessons);
    console.log(`✅ Created ${lessons.length} lessons`);
};

// Helper: Seed Enrollments
const seedEnrollments = async (students, courses) => {
    console.log('🎓 Seeding Enrollments...');
    const enrollments = [];

    for (const student of students) {
        // Pick random unique courses for each student
        const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
        const selectedCourses = shuffledCourses.slice(0, CONFIG.ENROLLMENTS_PER_STUDENT);

        for (const course of selectedCourses) {
            enrollments.push(new Enrollment({
                userId: student._id,
                courseId: course._id,
            }));
        }
    }

    await Enrollment.insertMany(enrollments);
    console.log(`✅ Created ${enrollments.length} enrollments`);
};

// Main Execution
const runSeed = async () => {
    try {
        await connectDB();
        await clearData();

        const { students, instructors } = await seedUsers();
        await seedProfiles([...students, ...instructors]);

        const courses = await seedCourses(instructors);
        await seedLessons(courses);
        await seedEnrollments(students, courses);

        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed script failed:', error);
        process.exit(1);
    }
};

runSeed();
