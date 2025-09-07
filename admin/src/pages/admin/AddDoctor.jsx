import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import {useSelector} from "react-redux"
import {toast} from "react-toastify"
import axios from "axios"

const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[experience,setExperience] = useState('1 Year')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General Physician')
    const [degree,setDegree] = useState('')
    const [fees,setFees] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const adminToken = useSelector(state => state.admin.adminToken)
    const backendUrl = useSelector((state) => state.admin.backendUrl);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if(!docImg)
            {
                return toast.error('Image Not Selected')
            }
            
            const formData = new FormData();
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',fees)
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

        
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl+'/api/v1/admin/add-doctor',formData,{headers:{Authorization: `Bearer ${adminToken}`}})
            if(data.success)    
            {   
                toast.success('Doctor added successfully!');
                setDocImg(false);
                setName('');
                setPassword('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees('');
            }
        } catch (error) {
            toast.error("Failed to add doctor details");
        }
    }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Add New Doctor</h1>
          <p className='text-gray-600'>Fill in the details below to add a new doctor to the system</p>
        </div>

        <form onSubmit={handleSubmit} className='w-full'>
          <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
            
            {/* Image Upload Section */}
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6'>
              <div className='flex items-center gap-6'>
                <div className='relative group'>
                  <label htmlFor="docImg" className='cursor-pointer block'>
                    <div className='w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white group-hover:scale-105 transition-transform duration-200'>
                      {docImg ? (
                        <img 
                          src={URL.createObjectURL(docImg)} 
                          alt="Doctor" 
                          className='w-full h-full object-cover' 
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                          <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className='absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:bg-blue-600 transition-colors'>
                      <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'></path>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'></path>
                      </svg>
                    </div>
                  </label>
                  <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='docImg' hidden accept="image/*"/>
                </div>
                <div className='text-white'>
                  <h3 className='text-xl font-semibold mb-2'>Doctor Profile Image</h3>
                  <p className='text-blue-100 text-sm'>Click to upload a professional photo (JPG, PNG)</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className='p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                
                {/* Left Column */}
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                      </svg>
                      Doctor Name
                    </label>
                    <input 
                      onChange={(e) => setName(e.target.value)} 
                      value={name} 
                      type="text" 
                      placeholder='Enter full name' 
                      required 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                      </svg>
                      Email Address
                    </label>
                    <input 
                      onChange={(e) => setEmail(e.target.value)} 
                      value={email} 
                      type="email" 
                      placeholder='doctor@example.com' 
                      required 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                      </svg>
                      Password
                    </label>
                    <input 
                      onChange={(e) => setPassword(e.target.value)} 
                      value={password} 
                      type="password" 
                      placeholder='Create a secure password' 
                      required 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                      </svg>
                      Experience
                    </label>
                    <select 
                      onChange={(e) => setExperience(e.target.value)} 
                      value={experience} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white'
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={`${i + 1} ${i + 1 === 1 ? 'Year' : 'Years'}`}>
                          {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'></path>
                      </svg>
                      Consultation Fees ($)
                    </label>
                    <input 
                      onChange={(e) => setFees(e.target.value)} 
                      value={fees} 
                      type="number" 
                      placeholder='50' 
                      required 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'></path>
                      </svg>
                      Speciality
                    </label>
                    <select 
                      onChange={(e) => setSpeciality(e.target.value)} 
                      value={speciality} 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-white'
                    >
                      <option value="General physician">General Physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatricians</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'></path>
                      </svg>
                      Education & Degree
                    </label>
                    <input 
                      onChange={(e) => setDegree(e.target.value)} 
                      value={degree} 
                      type="text" 
                      placeholder='MBBS, MD, etc.' 
                      required 
                      className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                      <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
                      </svg>
                      Clinic Address
                    </label>
                    <div className='space-y-3'>
                      <input 
                        onChange={(e) => setAddress1(e.target.value)} 
                        value={address1} 
                        type="text" 
                        placeholder='Street address, Building no.' 
                        required 
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                      />
                      <input 
                        onChange={(e) => setAddress2(e.target.value)} 
                        value={address2} 
                        type="text" 
                        placeholder='City, State, PIN Code' 
                        required 
                        className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className='mt-8 space-y-2'>
                <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                  <svg className='w-4 h-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                  </svg>
                  About Doctor
                </label>
                <textarea 
                  onChange={(e) => setAbout(e.target.value)} 
                  value={about} 
                  placeholder='Brief description about the doctor, their expertise, and approach to patient care...' 
                  rows='4' 
                  required 
                  className='w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-none'
                />
              </div>

              {/* Submit Button */}
              <div className='mt-8 flex justify-end'>
                <button 
                  type='submit' 
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2'
                >
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'></path>
                  </svg>
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor