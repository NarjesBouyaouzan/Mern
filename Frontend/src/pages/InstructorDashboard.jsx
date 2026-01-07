import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../services/courseService.js';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await createCourse(formData);
      alert('Course created successfully!');
      setFormData({ title: '', description: '', videoUrl: '' });
      setShowCreateForm(false);
      // Optionally reload or navigate
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
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
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Create New Course</h2>

            {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  {loading ? '⏳ Creating...' : '✅ Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-2xl text-gray-800 font-bold mb-2">
            Feature to list and manage your courses coming soon...
          </p>
          <p className="text-gray-600">Your courses will be displayed here once you start creating them!</p>
        </div>
      </div>
    </div>
  );
}
