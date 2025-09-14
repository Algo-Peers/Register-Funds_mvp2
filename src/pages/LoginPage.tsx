import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, X, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/AuthHeader';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, resetPassword, loading: authLoading, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear login error when user starts typing
    if (loginError) setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    
    try {
      await login(formData);
      navigate('/campaigns'); // Navigate to campaigns page after successful login
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetLoading(true);
    setResetError(null);
    
    try {
      await resetPassword(resetEmail);
      setResetSent(true);
      setTimeout(() => {
        setShowResetModal(false);
        setResetSent(false);
        setResetEmail('');
        setResetError(null);
      }, 3000);
    } catch (error) {
      setResetError(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsResetLoading(false);
    }
  };

  const closeModal = () => {
    setShowResetModal(false);
    setResetSent(false);
    setResetEmail('');
    setResetError(null);
  };

  return (
    <div className="min-h-screen bg-[#020E05]">
      {/* Header */}
      <motion.header 
        className="text-white sticky py-4 px-6 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AuthHeader type="login" />
      </motion.header>

      {/* Main Content - Centered */}
      <div className="flex items-center justify-center px-8">
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-white text-lg font-medium mb-6 tracking-wider">
              <span className='text-[#379751]'>REGISTERFUNDS </span>
                FOR SCHOOLS
            </div>
            
            <h1 className="text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Login into RegisterFunds
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto">
              Log in to update your campaign, share your current challenges, and connect with donors who care.
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {(loginError || authError) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
                >
                  {loginError || authError}
                </motion.div>
              )}

              {/* Email Field */}
              <div className="border-b">
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@email.com"
                  className="w-full py-4 bg-[#020E05] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                  disabled={isLoading || authLoading}
                />
              </div>

              {/* Password Field */}
              <div className='border-b'>
                <label className="block text-gray-300 text-sm font-medium mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full py-4 bg-[#020E05] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all pr-12"
                    required
                    disabled={isLoading || authLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading || authLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-white text-sm transition-colors hover:text-green-400"
                  disabled={isLoading || authLoading}
                >
                  Forget Password? <span className="text-white hover:text-green-400">Reset</span>
                </button>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full bg-[#12311A] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#09190d] transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading || authLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading || authLoading ? 1 : 0.95 }}
              >
                {(isLoading || authLoading) ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span>Login</span>
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#132418] rounded-2xl p-8 w-full max-w-md relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              disabled={isResetLoading}
            >
              <X size={24} />
            </button>

            {!resetSent ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#235F33] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                  <p className="text-gray-300 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Error Message */}
                {resetError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-4"
                  >
                    {resetError}
                  </motion.div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full py-3 px-4 bg-[#2D5037] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      required
                      disabled={isResetLoading}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
                      disabled={isResetLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isResetLoading}
                      className="flex-1 py-3 px-4 bg-[#235F33] text-white rounded-lg hover:bg-[#2a6b3d] transition-colors font-medium disabled:opacity-50"
                    >
                      {isResetLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Email Sent!</h2>
                <p className="text-gray-300 text-sm mb-6">
                  We've sent a password reset link to <span className="text-green-400">{resetEmail}</span>.
                  Please check your email and follow the instructions.
                </p>
                <div className="text-xs text-gray-400">
                  This window will close automatically...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginPage;