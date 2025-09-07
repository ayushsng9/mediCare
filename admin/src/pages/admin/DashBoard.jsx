import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDashData } from "../../store/adminSlice";
import { assets } from "../../assets/assets";

function DashBoard() {
  const { adminToken, dashData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminToken) {
      dispatch(getDashData());
    }
  }, [adminToken, dispatch]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  return (
    dashData && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Doctors Card */}
          <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full opacity-10"></div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <img src={assets.doctor_icon} alt="" className="w-10 h-10" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {dashData.doctors}
                </p>
                <p className="text-gray-500 font-medium">Total Doctors</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10"></div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                <img
                  src={assets.appointment_icon}
                  alt=""
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {dashData.appointments}
                </p>
                <p className="text-gray-500 font-medium">Appointments</p>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="group bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-bl-full opacity-10"></div>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                <img src={assets.patients_icon} alt="" className="w-10 h-10 " />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {dashData.patients}
                </p>
                <p className="text-gray-500 font-medium">Total Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                <img
                  src={assets.list_icon}
                  alt=""
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                Latest Bookings
              </h2>
            </div>
          </div>

          {/* Bookings List */}
          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments &&
            dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 group"
                >
                  {/* Doctor Image */}
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                      src={item.docData.image}
                      alt={item.docData.name}
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 ml-4">
                    <p className="text-gray-900 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <p className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                        Completed
                      </p>
                    ) : (
                      <button
                        onClick={() => handleCancelAppointment(item._id)}
                        className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Cancel Appointment"
                      >
                        <img
                          className="w-12"
                          src={assets.cancel_icon}
                          alt="cancel"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  No recent bookings
                </p>
                <p className="text-gray-400 text-sm">
                  New appointments will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DashBoard;
