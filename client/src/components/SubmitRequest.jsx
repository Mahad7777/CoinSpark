import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../context/userContext';
// import Loader from './Loader'; // Assuming you have a Loader component
import FormField from './FormField'; // Assuming you have a FormField component
import CustomButton from './CustomButton'; // Assuming you have a CustomButton component
import { checkIfImage } from '../utils';

const SubmitRequest = () => {
    const { user } = useContext(UserContext);
    const useremail = user.userData.email;
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        campaignTitle: '',
        story: '',
        goal: '',
        endDate: '',
        imageUrl: '',
        walletAddress: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoading(true);

        const data = { ...formData, useremail };
        checkIfImage(formData.imageUrl, async (exists)=>{
            if(exists){
                try {
                    const response = await axios.post('/campaigns', data, {
                        headers: {
                            'Content-Type': 'application/json'
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
            }else{
                toast.error('Provide valid image URL');
            }
        })
    };

    return (
        <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-depth">
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1abc9c] rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">Submit a Request</h1>
            </div>
            <div className="bg-gray-900 w-full mt-[20px] rounded-[10px]">
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px] p-7">
                    <div className="flex flex-wrap gap-[40px]">
                        <FormField 
                            labelName="Your Name *"
                            placeholder="Mahad"
                            inputType="text"
                            value={formData.name}
                            handleChange={(e) => handleChange('name', e.target.value)}
                        />
                        <FormField 
                            labelName="Campaign Title *"
                            placeholder="Write a title"
                            inputType="text"
                            value={formData.campaignTitle}
                            handleChange={(e) => handleChange('campaignTitle', e.target.value)}
                        />
                    </div>

                    <FormField 
                        labelName="Story *"
                        placeholder="Write your story"
                        isTextArea
                        value={formData.story}
                        handleChange={(e) => handleChange('story', e.target.value)}
                    />

                    <div className="flex flex-wrap gap-[40px]">
                        <FormField 
                            labelName="Goal *"
                            placeholder="ETH 0.50"
                            inputType="text"
                            value={formData.goal}
                            handleChange={(e) => handleChange('goal', e.target.value)}
                        />

                        <FormField 
                            labelName="End Date *"
                            placeholder="End Date"
                            inputType="date"
                            value={formData.endDate}
                            handleChange={(e) => handleChange('endDate', e.target.value)}
                        />
                    </div>

                    <FormField 
                        labelName="Campaign image *"
                        placeholder="Place image URL of your campaign"
                        inputType="url"
                        value={formData.imageUrl}
                        handleChange={(e) => handleChange('imageUrl', e.target.value)}
                    />

                    <FormField 
                        labelName="Wallet address"
                        placeholder="Provide a valid wallet address!"
                        inputType="text"
                        value={formData.walletAddress}
                        handleChange={(e) => handleChange('walletAddress', e.target.value)}
                    />

                    <div className="flex justify-center items-center mt-[40px]">
                        <CustomButton 
                            btnType="submit"
                            title="Submit new Request"
                            styles="bg-[#1abc9c]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitRequest;
