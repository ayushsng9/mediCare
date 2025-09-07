import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

function MyAppointments() {

  const {backendUrl,token} = useSelector((state) => state.apps);
  const [appointments,setAppointments] = useState([])

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const navigate = useNavigate();
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const getUserAppointments = async() => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/v1/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(data.success) {
        setAppointments(data.data.reverse());
      }
      else
      {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const cancelAppointment = async(appointmentId) => {
    try {
      const {data} = await axios.post(`${backendUrl}/api/v1/user/cancel-appointment`,{appointmentId},
      {headers: {Authorization: `Bearer ${token}`}});
      console.log(data);
      if(data.success)
      {
        toast.success(data.message);
        getUserAppointments();
      }
      else
      {
        toast.error(data.message)
      }
    } 
    catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name : 'Appointment Payment',
      description : 'Appointment Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler : async(response) => {
        console.log(response)
        
        try {
          const {data} = await axios.post(backendUrl+'/api/v1/user/verify-payment',response,{headers: {Authorization: `Bearer ${token}`}});
          if(data.success)
          {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message);
        }

      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const appointmentPayment = async(appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/v1/user/payment',{appointmentId},{headers: {Authorization: `Bearer ${token}`}})
      if(data.success)
      {
        initPay(data.data);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if(token) getUserAppointments();
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-200'>My appointments</p>
      <div>
          {appointments.map((item,index)=>(
            <div key = {index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-200'>
              <div>
                <img src = {item.docData.image} alt="" className='w-32 bg-indigo-50' />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-2'>Address :</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-2'><span className='text-sm text-neutral-700 font-medium'>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-white bg-indigo-500'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={() => appointmentPayment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-indigo-500 hover:text-white transition-all duration-300'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600  hover:text-white transition-all duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 '>Appointment cancelled</button>}
                {item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-green-600 rounded text-green-600 '>Appointment Completed</button>}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MyAppointments


