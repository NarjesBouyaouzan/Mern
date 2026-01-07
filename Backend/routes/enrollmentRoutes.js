import express from 'express';
import {
  enrollCourse,
  getUserEnrollments,
  unenrollCourse,
} from '../controllers/enrollmentController.js';
import { verifyJWT } from '../middleware/auth.js';

const router = express.Router();

// Protected routes (students only)
router.post('/', verifyJWT, enrollCourse);
router.get('/user/:userId', verifyJWT, getUserEnrollments);
router.delete('/:enrollmentId', verifyJWT, unenrollCourse);

export default router;
