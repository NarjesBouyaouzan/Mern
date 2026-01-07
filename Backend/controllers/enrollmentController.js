import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

/**
 * Enroll student in a course
 * POST /api/enrollments
 */
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId: req.user.id,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      userId: req.user.id,
      courseId,
    });

    await enrollment.save();

    res.status(201).json({
      message: 'Enrolled in course successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all enrollments for a user
 * GET /api/enrollments/user/:userId
 */
export const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      userId: req.params.userId,
    }).populate('courseId', 'title description instructorId');

    res.status(200).json({
      total: enrollments.length,
      enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Unenroll student from a course
 * DELETE /api/enrollments/:enrollmentId
 */
export const unenrollCourse = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Check if user is trying to unenroll from their own enrollment
    if (enrollment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to remove this enrollment' });
    }

    await Enrollment.deleteOne({ _id: req.params.enrollmentId });

    res.status(200).json({
      message: 'Unenrolled from course successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
