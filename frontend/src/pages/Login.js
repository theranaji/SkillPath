import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Login = ({ isRegister = false }) => {
  const [isLogin, setIsLogin] = useState(!isRegister);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const response = await authService.login(formData.email, formData.password);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', formData.email);
        navigate('/dashboard');
      } else {
        await authService.register(formData.name, formData.email, formData.password);
        alert('🎉 Registration successful! Please login.');
        setIsLogin(true);
        setFormData({ name: '', email: formData.email, password: '' });
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? '🚀 Welcome Back!' : '✨ Join SkillPath'}
          </h1>
          <p className="text-gray-300">
            {isLogin ? 'Continue your learning journey' : 'Start your tech interview preparation'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="👤 Full Name"
                className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="📧 Email Address"
              className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="🔒 Password"
              className="w-full p-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? '⏳ Processing...' : (isLogin ? '🚀 Login' : '✨ Create Account')}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-300">
            {isLogin ? "New to SkillPath? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline"
            >
              {isLogin ? 'Create Account' : 'Login Here'}
            </button>
          </p>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;