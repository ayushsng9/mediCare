import React from 'react'
import { assets } from '../assets/assets'
import { useSelector , useDispatch } from 'react-redux';
import { logoutAdmin } from '../store/adminSlice';
import { logoutDoctor } from '../store/doctorSlice';
import {useNavigate} from "react-router-dom"

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

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img src={assets.admin_logo} alt="" className='w-36 cursor-pointer' />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{adminToken? 'Admin' : 'Doctor'}</p>
      </div>
      {
        adminToken && (
            <button className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'
            onClick={handleLogoutAdmin}>
            Logout
            </button>
        )
      }
      {
        doctorToken && (
            <button className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'
            onClick={handleLogoutDoctor}>
            Logout
            </button>
        )
      }
    </div>
  )
}

export default Navbar
