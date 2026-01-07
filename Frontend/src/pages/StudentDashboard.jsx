import { useState, useEffect } from 'react';
import { getUserEnrollments } from '../services/enrollmentService.js';

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await getUserEnrollments(user.id);
        setEnrollments(response.data.enrollments);
      } catch (err) {
        setError('Failed to load enrollments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user.id) {
      fetchEnrollments();
    }
  }, [user.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600 font-semibold">✨ Loading your courses...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📚 Your Learning Journey</h1>
        <p className="text-xl text-gray-600">
          Welcome back, <strong className="text-gray-800">{user.name}</strong>! 👋 Here are your enrolled courses.
        </p>
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 font-medium">{error}</div>}

      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 border border-gray-100 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📖</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{enrollment.courseId?.title}</h3>
              <p className="text-gray-600 mb-5 font-light line-clamp-2">{enrollment.courseId?.description}</p>
              <div className="border-t pt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">👨‍🏫 Instructor:</span> {enrollment.courseId?.instructorId?.name || 'Unknown'}
                </p>
                <p className="text-xs text-gray-500">
                  📅 Enrolled: {new Date(enrollment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <button className="w-full mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Continue Learning →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100">
          <p className="text-3xl text-gray-800 font-bold mb-2">📭 No courses yet</p>
          <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
          <a href="/courses" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            🔍 Explore Courses
          </a>
        </div>
      )}
      </div>
    </div>
  );
}
