import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser({});
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
          📚 LearnHub
        </Link>
        
        <div className="flex gap-4 items-center flex-wrap">
          {user.id ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2 bg-white bg-opacity-10 rounded-lg backdrop-blur">
                <span className="text-sm">
                  Welcome, <strong className="text-lg">{user.name}</strong>
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold">
                  {user.role === 'instructor' ? '👨‍🏫 Instructor' : '👨‍🎓 Student'}
                </span>
              </div>
              {user.role === 'instructor' && (
                <Link to="/instructor-dashboard" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                  📊 Dashboard
                </Link>
              )}
              {user.role === 'student' && (
                <Link to="/student-dashboard" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                  📖 Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-white hover:text-purple-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-white text-purple-600 hover:scale-105 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
