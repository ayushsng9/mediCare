import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {setToken} from '../store/appSlice'
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'


function Login() {

    const [state,setState] = useState('Sign Up')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const backendUrl = useSelector((state) => state.apps.backendUrl);
    const token = useSelector((state) => state.apps.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    axios.defaults.withCredentials = true

    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try {

        if(state === 'Sign Up')
        {
            const {data} = await axios.post(backendUrl+'/api/v1/user/register',{name,password,email})
            if(data.success)
            {
                localStorage.setItem('token',data.data.token)
                dispatch(setToken(data.data.token));
            }
            else
            {
                toast.error(data.message)
            }
        }
        else
        {
            const {data} = await axios.post(backendUrl+'/api/v1/user/login',{email,password})
            if(data.success)
            {
                localStorage.setItem('token',data.data.token)
                dispatch(setToken(data.data.token));
            }
            else
            {
                toast.error(data.message)
            }
        }
        
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token){
            navigate('/');
        }
    },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-gray-200 rounded-xl border text-zinc-600 text-sm shadow-lg'>
            <p className='text-2xl font-semibold'>{state == 'Sign Up' ? "Create Account" : "Login"}</p>
            <p>Please {state == 'Sign Up' ? "sign up" : "log in"} to book an appointment </p>
            {
                state === 'Sign Up' && 
                <div className='w-full'>
                <p>Full Name</p>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='border border-zinc-300 rounded w-full p-2 mt-1'/>
                </div>
            }
            <div className='w-full'>
                <p>Email</p>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded w-full p-2 mt-1' />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded w-full p-2 mt-1' />
            </div>
            <button type='submit' className='bg-indigo-500 text-white w-full mt-2 py-2 rounded-md text-base'>
                {state == 'Sign Up' ? "Create Account" : "Login"}
            </button>
            {
                state === "Sign Up" 
                ? <p>Already have an account?<span onClick={() => setState('Login')} className='text-indigo-500 underline cursor-pointer'>Login here</span></p> 
                : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-indigo-500 underline cursor-pointer'>click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login
