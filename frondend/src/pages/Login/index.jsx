import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../Instance/Instance';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Admin Login Check
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      // localStorage.setItem('userToken', 'adminToken123'); // Dummy token for admin
      setMessage('Admin login successful!');
      navigate('/adminhome');
      return;
    }

    try {
      const response = await Axios.post('/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200 && response.data?.token) {
        localStorage.setItem('userToken', response.data.token);
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMessage('Invalid email or password');
      } else if (error.response?.status === 429) {
        setMessage('Too many login attempts. Please try again later.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {message && (
          <div
            className={`p-2 rounded-md ${
              message.includes('successful')
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging In...
            </span>
          ) : (
            'Login'
          )}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Sign Up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
