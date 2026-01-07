import express from 'express';
import {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.js';
import { verifyJWT, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/course/:courseId', getLessonsByCourse);

// Protected routes (instructor only)
router.post('/:courseId', verifyJWT, checkRole('instructor'), createLesson);
router.put('/:id', verifyJWT, checkRole('instructor'), updateLesson);
router.delete('/:id', verifyJWT, checkRole('instructor'), deleteLesson);

export default router;
