import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById } from '../services/courseService.js';
import { enrollCourse } from '../services/enrollmentService.js';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(id);
        setCourse(response.data.course);
        setLessons(response.data.lessons);
      } catch (err) {
        setError('Failed to load course details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user.id) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await enrollCourse(id);
      alert('Enrolled in course successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600 font-semibold">✨ Loading course details...</p></div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600 font-semibold">📭 Course not found</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
      {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 font-medium">{error}</div>}

      <div className="bg-white rounded-2xl shadow-xl p-10 mb-8 border border-gray-100">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{course.title}</h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">{course.description}</p>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="text-2xl">👨‍🏫</span>
              <div>
                <p className="text-sm text-gray-500">Instructor</p>
                <p className="font-bold text-gray-800">{course.instructorId?.name || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>

        {user.role === 'student' && (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="mt-8 w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg hover:shadow-lg font-bold text-lg disabled:bg-gray-400 transform hover:scale-105 transition-all duration-300"
          >
            {enrolling ? '⏳ Enrolling...' : '✅ Enroll Now'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">📚 Course Lessons</h2>
        <div className="space-y-6">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div key={lesson._id} className="group bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                    <p className="text-gray-600 mt-3 leading-relaxed">{lesson.content.substring(0, 300)}...</p>
                    <span className="inline-block mt-4 text-sm text-blue-600 font-semibold">Read more →</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-600 font-semibold">📭 No lessons available yet</p>
              <p className="text-gray-500 mt-2">Check back soon for course content!</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
