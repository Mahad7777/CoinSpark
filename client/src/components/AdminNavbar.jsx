import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CustomButton } from './';
import { useStateContext } from '../context';
import { UserContext } from '../context/userContext';

function Navbar() {
    const navigate = useNavigate();
    // const [isActive, setIsActive] = useState('dashboard');
    // const [toggleDrawer, setToggleDrawer] = useState(false);
    const { connect, address } = useStateContext();
    const {isAdmin} = useContext(UserContext)

    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return (
        <div className="flex md:flex-row flex-col justify-between mb-[35px] gap-6 pt-3w-full pt-3">
            <strong className='text-white pt-4 text-gradient'>CoinSpark</strong>
            {/* Left side links */}
            <div className="flex flex-row justify-start gap-4 py-4 ml-[130px]">
                <Link 
                    to="/admin-dashboard" 
                    className={` hover:text-[#1abc9c] ${activeLink === '/admin-dashboard' ? 'text-[#1abc9c]' : 'text-[#3498db]'}`}
                    onClick={() => handleLinkClick('/admin-dashboard')}
                >
                    Dashboard
                </Link>
                <Link 
                    to="/create-campaign" 
                    className={` hover:text-[#1abc9c] ${activeLink === '/create-campaign' ? 'text-[#1abc9c]' : 'text-[#3498db]'}`}
                    onClick={() => handleLinkClick('/create-campaign')}
                >
                    Start Campaign
                </Link>
                <Link 
                    to="/campaign-requests" 
                    className={` hover:text-[#1abc9c] ${activeLink === '/campaign-requests' ? 'text-[#1abc9c]' : 'text-[#3498db]'}`}
                    onClick={() => handleLinkClick('/campaign-requests')}
                >
                    Requests
                </Link>
            </div>
    
            {/* Right side buttons */}
            <div className="flex flex-row justify-end gap-4">
                {isAdmin && (
                    <CustomButton 
                        btnType="button"
                        title={'All campaigns'}
                        styles={'bg-[#1abc9c]'}
                        handleClick={() => {
                            navigate('/allcampaigns')
                        }}
                    />
                )}
                <CustomButton 
                    btnType="button"
                    title={address ? 'Connected with wallet! ' : 'Connect'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#3498db]'}
                    handleClick={() => {
                        connect()
                    }}
                />
            </div>
        </div>
    );    
}

export default Navbar

{/* <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
            <input type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        
            <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                <img src={search} alt="search" className="w-[15px] h-[15px] object-contain"/>
            </div>
        </div> */}

{/* Small screen navigation */}
        {/* <div className="sm:hidden flex justify-between items-center relative">
            <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>

            <img 
                src={menu}
                alt="menu"
                className="w-[34px] h-[34px] object-contain cursor-pointer"
                onClick={() => setToggleDrawer((prev) => !prev)}
            />

            <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
                <ul className="mb-4">
                    {navlinks.map((link) => (
                        <li
                        key={link.name}
                        className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                        onClick={() => {
                            setIsActive(link.name);
                            setToggleDrawer(false);
                            navigate(link.link);
                        }}
                        >
                        <img 
                            src={link.imgUrl}
                            alt={link.name}
                            className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                        />
                        <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                            {link.name}
                        </p>
                        </li>
                    ))}
                </ul>

                <div className="flex mx-4">
                    <CustomButton 
                        btnType="button"
                        title={address ? 'Create a campaign' : 'Connect'}
                        styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                        handleClick={() => {
                            if(address) navigate('create-campaign')
                            else connect();
                        }}
                    />
                </div>
            </div>
        </div> */}