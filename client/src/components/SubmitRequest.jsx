import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { UserContext } from '../context/userContext';

const SubmitRequest = () => {
    const {user} = useContext(UserContext)
    const useremail = user.userData.email
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        campaignTitle: '',
        story: '',
        goal: '',
        endDate: '',
        imageUrl: '',
        walletAddress: '',
        files: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, files });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('name', formData.name);
        data.append('campaignTitle', formData.campaignTitle);
        data.append('story', formData.story);
        data.append('goal', formData.goal);
        data.append('endDate', formData.endDate);
        data.append('imageUrl', formData.imageUrl);
        data.append('walletAddress', formData.walletAddress);
        data.append('useremail', useremail);
    
        formData.files.forEach((file) => {
            data.append('files', file);
        });
    
        try {
            const response = await axios.post('/campaigns', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Campaign created successfully:', response.data);
            toast.success(response.data.msg);
    
            // Reset form
            setFormData({
                name: '',
                campaignTitle: '',
                story: '',
                goal: '',
                endDate: '',
                imageUrl: '',
                walletAddress: '',
                files: []
            });
    
            navigate('/');
        } catch (err) {
            // Check if the error response has the 'err' property
            if (err.response && err.response.data && err.response.data.err) {
                toast.error(err.response.data.err);
            } else {
                toast.error('Server error');
            }
        }
    };
    

      return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6">Submit a New Campaign</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Campaign Title:</label>
                        <input
                            type="text"
                            name="campaignTitle"
                            value={formData.campaignTitle}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Story:</label>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Goal (Amount to be raised):</label>
                        <input
                            type="number"
                            name="goal"
                            placeholder='Enter amount in ETH'
                            value={formData.goal}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Image URL:</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Wallet Address:</label>
                        <input
                            type="text"
                            name="walletAddress"
                            placeholder='Cross check the wallet Address please! '
                            value={formData.walletAddress}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-300">Attach Documents:</label>
                    <input
                        type="file"
                        name="files"
                        onChange={handleFileChange}
                        multiple
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Campaign
                    </button>
                </form>
            </div>
        </div>
    );    
};

export default SubmitRequest;
