import React from 'react'
import { assets } from '../assets/assets'
import { useSelector, useDispatch } from 'react-redux';
import { logoutAdmin } from '../store/adminSlice';
import { logoutDoctor } from '../store/doctorSlice';
import { useNavigate } from "react-router-dom"

function Navbar() {
    const adminToken = useSelector((state) => state.admin.adminToken);
    const doctorToken = useSelector((state) => state.doctor.doctorToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutAdmin = () => {
        dispatch(logoutAdmin());
        navigate('/');
    }

    const handleLogoutDoctor = () => {
        dispatch(logoutDoctor());
        navigate('/');
    }

    const isLoggedIn = adminToken || doctorToken;
    const userType = adminToken ? 'Admin' : 'Doctor';

    return (
        <div className='flex justify-between items-center px-3 sm:px-6 md:px-10 py-3 border-b bg-white shadow-sm'>
            <div className='flex items-center gap-2 text-xs min-w-0'>
                <img 
                    src={assets.admin_logo} 
                    alt="Admin Logo" 
                    className='w-24 sm:w-32 md:w-36 cursor-pointer flex-shrink-0' 
                />
                <p className='border px-2 sm:px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 text-xs sm:text-sm whitespace-nowrap'>
                    {userType}
                </p>
            </div>
            
            {isLoggedIn && (
                <div className='flex items-center gap-2'>
                    {/* Desktop Logout Button */}
                    <button 
                        className='hidden sm:block bg-[#5F6FFF] hover:bg-[#4F5FEF] text-white text-sm px-6 md:px-10 py-2 rounded-full transition-colors duration-200 shadow-sm'
                        onClick={adminToken ? handleLogoutAdmin : handleLogoutDoctor}
                    >
                        Logout
                    </button>
                    
                    {/* Mobile Logout Button */}
                    <button 
                        className='sm:hidden bg-[#5F6FFF] hover:bg-[#4F5FEF] text-white text-xs px-4 py-2 rounded-full transition-colors duration-200 shadow-sm'
                        onClick={adminToken ? handleLogoutAdmin : handleLogoutDoctor}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default Navbar