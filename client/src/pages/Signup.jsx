import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/user/signup', formData);
            if (res.err) {
                toast.error(res.data.err);
            } else {
                toast.success(res.data.msg);
                navigate('/login');
            }
        } catch (err) {
            toast.error("Error in catch block!");
            console.log("Error in catch block: ", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">
            <div className="relative p-8 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-3xl font-bold text-gradient mb-6 text-center">Coin Spark</h1>
                <h2 className="text-lg font-semibold text-white mb-2 text-center">Sign Up</h2>
                <form onSubmit={onSubmit} className="flex flex-col items-center gap-4 w-full">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm font-medium text-gray-400">Enter your name</span>
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Name"
                            />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4 8a4 4 0 118 0 4 4 0 01-8 0zm9-4a1 1 0 011-1h1a2 2 0 00-2-2H8a2 2 0 00-2 2h5a1 1 0 011 1z" clipRule="evenodd" />
                            </svg> */}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm font-medium text-gray-400">Enter your email</span>
                        <div className="relative flex items-center w-full">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                            />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z" clipRule="evenodd" />
                            </svg> */}
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-full">
                        <span className="text-sm font-medium text-gray-400">Enter your password</span>
                        <div className="relative flex items-center w-full">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                minLength="6"
                                className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Password"
                            />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4 8a4 4 0 118 0 4 4 0 01-8 0zm9-4a1 1 0 011-1h1a2 2 0 00-2-2H8a2 2 0 00-2 2h5a1 1 0 011 1z" clipRule="evenodd" />
                            </svg> */}
                        </div>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                        Sign Up
                    </button>
                </form>

                <div className="w-full h-1 my-4 bg-gray-300"></div>
                <div className="flex items-center justify-center w-full">
                  <Link to="/Login" className="text-sm font-medium text-blue-600 hover:underline">
                    Already a user? Login!
                </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
