import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthHeaderProps {
  type: 'login' | 'signup';
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between p-6 lg:p-8">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-3xl font-bold">Register</span>
        <span className="bg-green-400 px-2 py-1 rounded text-sm font-semibold">
          FUNDS
        </span>
      </Link>

      {/* Navigation Link */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
        <span className="text-gray-300 text-sm sm:text-base">
          {type === 'login' ? "Don't have an account?" : "Have an account already?"}
        </span>
        {type === 'login' ? (
          <button
            onClick={() => navigate('/signup')}
            className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium text-sm sm:text-base hover:underline"
          >
            Sign up →
          </button>
        ) : (
          <Link 
            to="/login" 
            className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium text-sm sm:text-base hover:underline"
          >
            Login →
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthHeader;