import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, completeAppointment, cancelAppointment } from "../../store/doctorSlice";
import { assets } from "../../assets/assets";

const MONTHS = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GRID_COLS = "grid-cols-[0.5fr_2fr_1fr_3fr_1fr_1fr]";

const AppointmentStatus = ({ item, onCancel, onComplete }) => {
  if (item.cancelled) {
    return (
      <span className="text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
        Cancelled
      </span>
    );
  }
  
  if (item.isCompleted) {
    return (
      <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
        Completed
      </span>
    );
  }
  
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onCancel(item._id)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors duration-200"
        aria-label="Cancel appointment"
      >
        <img
          src={assets.cancel_icon}
          alt="Cancel"
          className="w-10 h-10"
        />
      </button>
      <button
        onClick={() => onComplete(item._id)}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-50 transition-colors duration-200"
        aria-label="Complete appointment"
      >
        <img
          src={assets.tick_icon}
          alt="Complete"
          className="w-10 h-10"
        />
      </button>
    </div>
  );
};

const PatientInfo = ({ userData }) => (
  <div className="flex items-center gap-3">
    <img
      src={userData.image}
      alt={`${userData.name}'s profile`}
      className="w-10 rounded-full object-cover border border-gray-200"
    />
    <span className="font-medium text-gray-900">{userData.name}</span>
  </div>
);

const PaymentBadge = ({ isOnline }) => (
  <span className={`text-xs px-3 py-1 rounded-full border ${
    isOnline 
      ? 'border-blue-500 text-blue-700 bg-blue-50' 
      : 'border-green-500 text-green-700 bg-green-50'
  }`}>
    {isOnline ? "Online" : "Cash"}
  </span>
);

function DoctorAppointment() {
  const dispatch = useDispatch();
  const { doctorToken, appointments, loading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctorToken) {
      dispatch(getAppointments());
    }
  }, [doctorToken, dispatch]);

  const formatSlotDate = useCallback((slotDate) => {
    const [day, month, year] = slotDate.split("_");
    return `${day} ${MONTHS[Number(month)]} ${year}`;
  }, []);

  const handleCancelAppointment = useCallback((appointmentId) => {
    dispatch(cancelAppointment(appointmentId));
  }, [dispatch]);

  const handleCompleteAppointment = useCallback((appointmentId) => {
    dispatch(completeAppointment(appointmentId));
  }, [dispatch]);

  const appointmentStats = useMemo(() => {
    if (!appointments) return { total: 0, completed: 0, cancelled: 0, pending: 0 };
    
    return appointments.reduce((stats, appointment) => {
      stats.total++;
      if (appointment.cancelled) stats.cancelled++;
      else if (appointment.isCompleted) stats.completed++;
      else stats.pending++;
      return stats;
    }, { total: 0, completed: 0, cancelled: 0, pending: 0 });
  }, [appointments]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl m-5">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl m-5">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Error loading appointments: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Header with stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">All Appointments</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-600 text-sm font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-900">{appointmentStats.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-600 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-900">{appointmentStats.completed}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-600 text-sm font-medium">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">{appointmentStats.pending}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-600 text-sm font-medium">Cancelled</p>
            <p className="text-2xl font-bold text-red-900">{appointmentStats.cancelled}</p>
          </div>
        </div>
      </div>

      {/* Appointments table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Table header */}
          <div className={`hidden sm:grid ${GRID_COLS} gap-4 py-4 px-6 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700 sticky top-0`}>
            <span>#</span>
            <span>Patient</span>
            <span>Payment</span>
            <span>Date & Time</span>
            <span>Fees</span>
            <span>Actions</span>
          </div>

          {/* Table body */}
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                key={appointment._id || index}
                className={`
                  flex flex-col sm:grid ${GRID_COLS} gap-4 p-6 border-b border-gray-100 
                  hover:bg-gray-50 transition-colors duration-150
                  ${appointment.cancelled ? 'opacity-75' : ''}
                `}
              >
                <div className="hidden sm:block text-sm text-gray-500 font-medium">
                  {index + 1}
                </div>

                <div className="sm:contents">
                  <div className="sm:hidden text-xs text-gray-500 font-medium mb-1">
                    #{index + 1} • Patient
                  </div>
                  <PatientInfo userData={appointment.userData} />
                </div>

                <div className="sm:contents">
                  <div className="sm:hidden text-xs text-gray-500 font-medium mb-1 mt-3">
                    Payment Method
                  </div>
                  <div>
                    <PaymentBadge isOnline={appointment.payment} />
                  </div>
                </div>

                <div className="sm:contents">
                  <div className="sm:hidden text-xs text-gray-500 font-medium mb-1 mt-3">
                    Date & Time
                  </div>
                  <div className="text-sm text-gray-900">
                    <div className="font-medium">
                      {formatSlotDate(appointment.slotDate)}
                    </div>
                    <div className="text-gray-600">
                      {appointment.slotTime}
                    </div>
                  </div>
                </div>

                <div className="sm:contents">
                  <div className="sm:hidden text-xs text-gray-500 font-medium mb-1 mt-3">
                    Consultation Fee
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    ₹{appointment.amount}
                  </div>
                </div>

                <div className="sm:contents">
                  <div className="sm:hidden text-xs text-gray-500 font-medium mb-1 mt-3">
                    Status & Action
                  </div>
                  <AppointmentStatus
                    item={appointment}
                    onCancel={handleCancelAppointment}
                    onComplete={handleCompleteAppointment}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-500">Appointments will appear here once patients book with you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointment;