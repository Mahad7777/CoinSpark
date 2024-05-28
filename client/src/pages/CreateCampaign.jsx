import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {ethers} from 'ethers';
import { useStateContext  } from '../context';
import { money } from '../assets';
import { CustomButton,FormField,Loader } from '../components';
import {checkIfImage} from '../utils';
// import isImageUrl from 'is-image-url';

const CreateCampaign = () => {
  const location = useLocation();
  const initialFormData = location.state?.campaign || {};

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    walletAddress: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
        if (exists) {
            setIsLoading(true);
            await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
            setIsLoading(false);
            navigate('/');
        } else {
            alert('Provide valid image URL');
            setForm({ ...form, image: '' });
        }
    });
};

useEffect(() => {
  if (initialFormData) {
    const updatedForm = {
      name: initialFormData.name || '',
      title: initialFormData.campaignTitle || '',
      description: initialFormData.story || '',
      target: initialFormData.goal || '',
      deadline: initialFormData.endDate || '',
      image: initialFormData.imageUrl || '',
      walletAddress: initialFormData.walletAddress || '',
    };

    // Only update state if there are actual changes
    const formChanged = Object.keys(updatedForm).some(
      key => updatedForm[key] !== form[key]
    );

    if (formChanged) {
      setForm(updatedForm);
    }
  }
}, [initialFormData]);


  return (
    <div className="flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 shadow-depth">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1abc9c] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">Start a Campaign</h1>
      </div>
      <div className="bg-gray-900 w-full mt-[20px] rounded-[10px]">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px] p-7">
          <div className="flex flex-wrap gap-[40px]">
            <FormField 
              labelName="Your Name *"
              placeholder="Mahad"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange('name', e)}
            />
            <FormField 
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>
  
          <FormField 
              labelName="Story *"
              placeholder="Write your story"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description', e)}
            />
  
          {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
          </div> */}
  
          <div className="flex flex-wrap gap-[40px]">
            <FormField 
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange('target', e)}
            />
  
            <FormField 
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </div>
  
          <FormField 
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image', e)}
            />
  
          <FormField 
              labelName="Wallet address"
              placeholder="Provide a valid wallet address!"
              inputType="text"
              value={form.walletAddress}
              handleChange={(e) => handleFormFieldChange('walletAddress', e)}
            />
  
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1abc9c]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCampaign