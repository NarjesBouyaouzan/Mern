import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';
import { lessonSchema } from '../config/validation.js';

/**
 * Create a new lesson in a course
 * POST /api/lessons
 */
export const createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate input
    const { error, value } = lessonSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if course exists and user is instructor
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }

    const { title, content, order } = value;

    const lesson = new Lesson({
      title,
      content,
      courseId,
      order,
    });

    await lesson.save();

    res.status(201).json({
      message: 'Lesson created successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all lessons for a course
 * GET /api/lessons/course/:courseId
 */
export const getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId }).sort({ order: 1 });

    res.status(200).json({
      total: lessons.length,
      lessons,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update a lesson
 * PUT /api/lessons/:id
 */
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if user is instructor of the course
    const course = await Course.findById(lesson.courseId);
    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this lesson' });
    }

    const { error, value } = lessonSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    lesson.title = value.title;
    lesson.content = value.content;
    lesson.order = value.order;
    await lesson.save();

    res.status(200).json({
      message: 'Lesson updated successfully',
      lesson,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete a lesson
 * DELETE /api/lessons/:id
 */
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if user is instructor of the course
    const course = await Course.findById(lesson.courseId);
    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this lesson' });
    }

    await Lesson.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
