import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
    const navigate = useNavigate()
    const {fetchUserProfile} = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/user/login', formData);
      if (res.data.err) {
          toast.error(res.data.err);
      } else {
          toast.success(res.data.msg);
          fetchUserProfile()
          if (res.data.user.isadmin) {
            navigate('/admin-dashboard'); // Navigate to admin dashboard
        } else {
            navigate('/'); // Navigate to user dashboard
        }
      }
  } catch (err) {
      // Check if the error has a response with a specific error message
      if (err.response && err.response.data && err.response.data.err) {
          toast.error(err.response.data.err);
      } else {
          toast.error('Server error');
      }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
