import mongoose from 'mongoose';

/**
 * Course Model - Represents a course created by an instructor
 * 1-to-Many relationship: Instructor (User) has many Courses
 * 
 * Fields:
 * - title: Course title
 * - description: Course description
 * - instructorId: Reference to User (instructor)
 * - createdAt: Timestamp of course creation
 */
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Course must have an instructor'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
