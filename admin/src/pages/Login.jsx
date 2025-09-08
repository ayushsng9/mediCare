import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios'
import { setAdminToken } from '../store/adminSlice';
import { setDoctorToken } from '../store/doctorSlice';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

function Login() {
  
  const [state,setState] = useState('Admin')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const backendUrl = useSelector((state) => state.admin.backendUrl);

  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        if(state === 'Admin')
        { 
          // response we will get from api call
          const {data} = await axios.post(backendUrl + '/api/v1/admin/login',{email,password});
          if(data.success){
            // store in localstorage also
            toast(data.message);
            localStorage.setItem('adminToken',data.data.token)
            dispatch(setAdminToken(data.data.token));
            navigate('/admin-dashboard')
          }   
        }
        else
        {
          const {data} = await axios.post(backendUrl + '/api/v1/doctor/login',{email,password});
          if(data.success){
            // store in localstorage also
            toast(data.message);
            localStorage.setItem('doctorToken',data.data.token)
            dispatch(setDoctorToken(data.data.token));
            navigate('/doctor-dashboard')
          }   
        }
      } catch (error) { 
        toast.error("Login Failed");
      }
  }

  return (  
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl text-[#5E5E5E] textsm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value) } value={email} type="email" required className='border border-[#DADADA] rounded w-full p-2 mt-1'/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className='border border-[#DADADA] rounded w-full p-2 mt-1'/>
        </div>
        <button className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>
        {
            state === 'Admin'
            ? <p>Doctor Login? <span onClick={()=>setState('Doctor')} className='text-[#5F6FFF] underline cursor-pointer' >Click Here</span></p>
            : <p>Admin Login? <span onClick={()=>setState('Admin')} className='text-[#5F6FFF] underline cursor-pointer' >Click Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
