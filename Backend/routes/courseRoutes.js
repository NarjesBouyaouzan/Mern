import express from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { verifyJWT, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes (instructor only)
router.post('/', verifyJWT, checkRole('instructor'), createCourse);
router.put('/:id', verifyJWT, checkRole('instructor'), updateCourse);
router.delete('/:id', verifyJWT, checkRole('instructor'), deleteCourse);

export default router;
