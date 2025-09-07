import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom';

function App() {

  const adminToken  = useSelector((state) => state.admin.adminToken );
  const doctorToken  = useSelector((state) => state.doctor.doctorToken);

  return adminToken || doctorToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer/>
    </> 
  )
}

export default App
