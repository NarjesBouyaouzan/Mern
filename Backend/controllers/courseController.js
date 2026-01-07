import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import { courseSchema } from '../config/validation.js';

/**
 * Create a new course (instructor only)
 * POST /api/courses
 */
export const createCourse = async (req, res) => {
  try {
    // Validate input
    const { error, value } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, description, videoUrl } = value;

    const course = new Course({
      title,
      description,
      videoUrl,
      instructorId: req.user.id,
    });

    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all courses
 * GET /api/courses
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructorId', 'name email');

    res.status(200).json({
      total: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get course by ID with lessons
 * GET /api/courses/:id
 */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructorId', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lessons = await Lesson.find({ courseId: req.params.id }).sort({ order: 1 });

    res.status(200).json({
      course,
      lessons,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update course (instructor only)
 * PUT /api/courses/:id
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the instructor
    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const { error, value } = courseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    course.title = value.title;
    course.description = value.description;
    course.videoUrl = value.videoUrl;
    await course.save();

    res.status(200).json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Delete course (instructor only)
 * DELETE /api/courses/:id
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the instructor
    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    // Delete associated lessons
    await Lesson.deleteMany({ courseId: req.params.id });

    // Delete course
    await Course.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
