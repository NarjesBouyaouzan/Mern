import api from './api.js';

// Get all courses
export const getAllCourses = () => {
  return api.get('/courses');
};

// Get course by ID
export const getCourseById = (id) => {
  return api.get(`/courses/${id}`);
};

// Create course (instructor only)
export const createCourse = (data) => {
  return api.post('/courses', data);
};

// Update course
export const updateCourse = (id, data) => {
  return api.put(`/courses/${id}`, data);
};

// Delete course
export const deleteCourse = (id) => {
  return api.delete(`/courses/${id}`);
};
