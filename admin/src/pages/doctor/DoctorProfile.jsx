import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../store/doctorSlice";

function DoctorProfile() {
  const dispatch = useDispatch();
  const { doctorToken, doctorProfileData } = useSelector((state) => state.doctor);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (doctorToken) dispatch(getDoctorProfile());
  }, [doctorToken, dispatch]);

  // sync profile data into formData when profile is fetched
  useEffect(() => {
    if (doctorProfileData) {
      setFormData({
        name: doctorProfileData.name,
        degree: doctorProfileData.degree,
        speciality: doctorProfileData.speciality,
        experience: doctorProfileData.experience,
        about: doctorProfileData.about,
        fees: doctorProfileData.fees,
        address: doctorProfileData.address,
        available: doctorProfileData.available,
        image: doctorProfileData.image,
      });
    }
  }, [doctorProfileData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    dispatch(updateDoctorProfile(formData));
    setIsEdit(false);
  };

  if (!doctorProfileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                  formData.available ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {formData.name}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 text-blue-100 mb-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {formData.degree}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {formData.speciality}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {formData.experience} Experience
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className={`w-3 h-3 rounded-full ${formData.available ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-white font-medium">
                    {formData.available ? 'Available for appointments' : 'Currently unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About
              </h2>
            </div>
            {isEdit ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                placeholder="Tell patients about yourself..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{formData.about}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contact Information
            </h2>
            
            {/* Consultation Fee */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Fee</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">₹</span>
                {isEdit ? (
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-2xl font-bold text-green-600">{formData.fees}</span>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Address</label>
              {isEdit ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter clinic address"
                />
              ) : (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-700">
                    {doctorProfileData.address.split(",")[0].slice(8,-1)}
                  </p>
                  <p className="text-gray-700">
                    {doctorProfileData.address.split(",")[1].slice(9)}
                  </p>
                </div>
              )}
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-medium text-gray-700">
                Available for appointments
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  disabled={!isEdit}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${!isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;