import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/courseService.js';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center py-20"><div className="text-xl text-gray-600 font-semibold">✨ Loading courses...</div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📖 Explore Courses</h1>
          <p className="text-gray-600 text-lg">Discover and enroll in amazing courses</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200 font-medium">{error}</div>}

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link key={course._id} to={`/course/${course._id}`}>
                <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">📚</div>
                    <div className="flex gap-2">
                      <span className="text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">New</span>
                      {course.videoUrl && <span className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded-full">🎥 Video</span>}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <p className="text-gray-600 mb-4 font-light line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <p className="font-semibold">👨‍🏫 {course.instructorId?.name || 'Unknown'}</p>
                    <span className="text-blue-600 font-bold group-hover:text-blue-700">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-600 font-semibold">📭 No courses available yet</p>
            <p className="text-gray-500 mt-2">Check back soon for new courses!</p>
          </div>
        )}
      </div>
    </div>
  );
}
