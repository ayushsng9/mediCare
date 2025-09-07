import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAppointments } from '../../store/adminSlice'
import { assets } from "../../assets/assets"
import { cancelAppointment } from '../../store/adminSlice';

function AllAppointments() {
  const dispatch = useDispatch()
  const { adminToken, appointments, loading } = useSelector((state) => state.admin)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // all, active, cancelled

  useEffect(() => {
    if (adminToken) {
      dispatch(getAllAppointments());
    }
  }, [adminToken, dispatch])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  // Enhanced filtering
  const filteredAppointments = appointments?.filter(appointment => {
    const matchesSearch = appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'cancelled' && appointment.cancelled) ||
                         (statusFilter === 'active' && !appointment.cancelled)
    
    return matchesSearch && matchesStatus
  }) || []

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(appointmentId))
    }
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-5'>
      {/* Header Section */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>All Appointments</h1>
        
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h3 className='text-sm font-medium text-blue-600'>Total Appointments</h3>
            <p className='text-2xl font-bold text-blue-800'>{appointments?.length || 0}</p>
          </div>
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h3 className='text-sm font-medium text-green-600'>Active Appointments</h3>
            <p className='text-2xl font-bold text-green-800'>
              {appointments?.filter(apt => !apt.cancelled).length || 0}
            </p>
          </div>
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <h3 className='text-sm font-medium text-red-600'>Cancelled Appointments</h3>
            <p className='text-2xl font-bold text-red-800'>
              {appointments?.filter(apt => apt.cancelled).length || 0}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <div className='flex-1'>
            <input
              type="text"
              placeholder="Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center py-12'>
            <div className='text-gray-500'>Loading appointments...</div>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_2.5fr_2.5fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b font-medium text-gray-700'>
              <p>#</p>
              <p>Patient</p>
              <p>Date & Time</p>
              <p>Doctor</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>

            {/* Table Body */}
            <div className='max-h-[70vh] overflow-y-auto'>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item, index) => (
                  <div
                    key={item._id || index}
                    className={`flex flex-col sm:grid sm:grid-cols-[0.5fr_2.5fr_2.5fr_2.5fr_1fr_1fr] gap-2 sm:gap-4 items-start sm:items-center p-4 sm:px-6 border-b hover:bg-gray-50 transition-colors
                    }`}
                  >
                    <p className='hidden sm:block text-gray-500 font-medium'>{index + 1}</p>
                    
                    {/* Patient Info */}
                    <div className='flex items-center gap-3'>
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className='w-10 rounded-full object-cover border-2 border-gray-200'
                        onError={(e) => {
                          e.target.src = '/api/placeholder/40/40'
                        }}
                      />
                      <div>
                        <p className='font-medium text-gray-800'>{item.userData.name}</p>
                        <p className='text-sm text-gray-500 sm:hidden'>
                          {slotDateFormat(item.slotDate)} | {item.slotTime}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className='hidden sm:block'>
                      <p className='font-medium text-gray-700'>
                        {slotDateFormat(item.slotDate)}
                      </p>
                      <p className='text-sm text-gray-500'>{item.slotTime}</p>
                    </div>

                    {/* Doctor Info */}
                    <div className='flex items-center gap-3'>
                      <img
                        src={item.docData.image}
                        alt={item.docData.name}
                        className='w-10 h-10 rounded-full object-cover border-2 border-gray-200'
                        onError={(e) => {
                          e.target.src = '/api/placeholder/40/40'
                        }}
                      />
                      <div>
                        <p className='font-medium text-gray-800'>{item.docData.name}</p>
                        <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
                      </div>
                    </div>

                    {/* Fees */}
                    <p className='font-semibold text-green-600'>₹{item.amount}</p>

                    {/* Actions */}
                    <div className='flex items-center gap-2'>
                      {item.cancelled ? (
                        <span className='px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full'>
                          Cancelled
                        </span>
                      ) : item.isCompleted 
                        ? <p className='px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full'>Completed</p>
                        : (
                        <button
                          onClick={() => handleCancelAppointment(item._id)}
                          className='flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors'
                          title="Cancel Appointment"
                        >
                          <img 
                            className='w-12' 
                            src={assets.cancel_icon} 
                            alt="cancel"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-12 text-gray-500'>
                  <p className='text-lg mb-2'>No appointments found</p>
                  <p className='text-sm'>
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'No appointments have been scheduled yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Results Summary */}
      {filteredAppointments.length > 0 && (
        <div className='mt-4 text-sm text-gray-600'>
          Showing {filteredAppointments.length} of {appointments?.length || 0} appointments
        </div>
      )}
    </div>
  )
}

export default AllAppointments