import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../Instance/Instance'; // Assuming Axios is set up for your API calls
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!formData.email.trim() || !formData.password.trim()) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Check if it's an admin login
    if (formData.email === 'admin@gmail.com' && formData.password === 'Admin123') {
      localStorage.setItem('userRole', 'admin'); // Store role for session management
      navigate('/adminhome'); // Redirect to admin dashboard
      return;
    }
  
    try {
      const response = await Axios.post('/login', formData);
  
      if (response.status === 200) {
        setMessage('Login successful!');
        localStorage.setItem('userToken', response.data.token); // Store JWT token
        navigate('/'); // Redirect user to home
      } else {
        setMessage('Invalid email or password');
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {message && (
          <div
            className={`p-2 mt-2 rounded-md ${message.includes('successful') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          >
            {message}
          </div>
        )}

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
