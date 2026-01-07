import api from './api.js';

// Enroll in course
export const enrollCourse = (courseId) => {
  return api.post('/enrollments', { courseId });
};

// Get user enrollments
export const getUserEnrollments = (userId) => {
  return api.get(`/enrollments/user/${userId}`);
};

// Unenroll from course
export const unenrollCourse = (enrollmentId) => {
  return api.delete(`/enrollments/${enrollmentId}`);
};
