import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse, getAllCourses, deleteCourse, updateCourse } from '../services/courseService.js';
import { useEffect } from 'react';

export default function InstructorDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      // Filter courses by current instructor
      const myCourses = response.data.courses.filter(course =>
        (course.instructorId._id || course.instructorId) === user.id
      );
      setCourses(myCourses);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course._id);
    setFormData({
      title: course.title,
      description: course.description,
      videoUrl: course.videoUrl || '',
    });
    setShowCreateForm(true);
  };

  const calculateFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingCourse) {
        await updateCourse(editingCourse, formData);
        alert('Course updated successfully!');
      } else {
        await createCourse(formData);
        alert('Course created successfully!');
      }

      setFormData({ title: '', description: '', videoUrl: '' });
      setEditingCourse(null);
      setShowCreateForm(false);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">📊 Instructor Dashboard</h1>
          <p className="text-xl text-gray-600">
            Welcome, <strong className="text-gray-800">{user.name}</strong>! 👋 Manage your courses and grow your impact.
          </p>
        </div>

        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg hover:shadow-lg font-bold text-lg mb-8 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            ➕ Create New Course
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl p-10 mb-8 max-w-2xl border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {editingCourse ? '✏️ Edit Course' : 'Create New Course'}
            </h2>

            {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 font-medium">{error}</div>}

            <form onSubmit={calculateFormSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Introduction to Web Development"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Video URL (Optional)</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Describe what students will learn in this course..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:bg-gray-400 transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? '⏳ Saving...' : (editingCourse ? '💾 Save Changes' : '✅ Create Course')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingCourse(null);
                    setFormData({ title: '', description: '', videoUrl: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-2">{course.description.substring(0, 100)}...</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📅 {new Date(course.createdAt).toLocaleDateString()}</span>
                    {course.videoUrl && <span className="text-blue-600 font-medium">🎥 Video included</span>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-lg font-bold hover:bg-yellow-100 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-2xl text-gray-800 font-bold mb-2">
                No courses created yet.
              </p>
              <p className="text-gray-600">Start by clicking the "Create New Course" button above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
