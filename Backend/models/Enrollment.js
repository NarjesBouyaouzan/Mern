import mongoose from 'mongoose';

/**
 * Enrollment Model - Represents Many-to-Many relationship between Users and Courses
 * A student can enroll in many courses
 * A course can have many enrolled students
 * 
 * Fields:
 * - userId: Reference to Student (User)
 * - courseId: Reference to Course
 * - enrolledAt: Timestamp of enrollment
 */
const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Enrollment must have a user'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Enrollment must have a course'],
    },
  },
  { timestamps: true }
);

// Prevent duplicate enrollments (same user can't enroll in same course twice)
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
