import mongoose from 'mongoose';

/**
 * Lesson Model - Represents a lesson within a course
 * 1-to-Many relationship: Course has many Lessons
 * 
 * Fields:
 * - title: Lesson title
 * - content: Lesson content/body
 * - courseId: Reference to Course
 * - order: Order of lesson in the course (for sorting)
 */
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a lesson title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide lesson content'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Lesson must belong to a course'],
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
