export default function HomePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to LearnHub 📚</h1>
      <p className="text-xl text-gray-600 mb-8 font-light max-w-2xl mx-auto">
        Your gateway to quality online learning. Sign up today and start your journey!
      </p>

      {user.id ? (
        <div>
          <p className="text-lg mb-6">Hi {user.name}! What would you like to do?</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/courses"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Browse Courses
            </a>
            {user.role === 'student' && (
              <a
                href="/student-dashboard"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                My Courses
              </a>
            )}
            {user.role === 'instructor' && (
              <a
                href="/instructor-dashboard"
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Manage Courses
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/login"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Register
          </a>
        </div>
      )}

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎓</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Learn</h3>
          <p className="text-gray-600 font-light">Access quality courses from expert instructors worldwide</p>
        </div>
        <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Connect</h3>
          <p className="text-gray-600 font-light">Join a vibrant community of passionate learners</p>
        </div>
        <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📈</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Grow</h3>
          <p className="text-gray-600 font-light">Develop new skills and advance your career</p>
        </div>
      </div>
      </div>
    </div>
  );
}
