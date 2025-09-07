import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfileData } from "../store/appSlice";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const { userProfileData, token, backendUrl } = useSelector(
    (state) => state.apps
  );
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfileData) setUserData(userProfileData);
  }, [userProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const updateUserData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/update-profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserProfileData(data.data));
        setUserData(data.data);
        setIsEdit(false);
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (!userProfileData) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return userData && (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 flex flex-col gap-6">
      
      {/* Profile Image */}
      <div className="flex justify-center">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : userData.image || assets.profile_pic}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-2 border-indigo-500 opacity-80 hover:opacity-100 transition"
            />
            <img
              src={assets.upload_icon}
              alt="Upload"
              className="w-10  absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36  rounded-full object-cover border-2 border-indigo-500"
            src={userData.image || assets.profile_pic}
            alt="Profile"
          />
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        {isEdit ? (
          <input
            name="name"
            type="text"
            value={userData.name || ""}
            onChange={handleChange}
            className="w-full text-2xl font-semibold text-center p-2 border rounded-lg focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-800">{userData.name}</p>
        )}
      </div>

      <hr className="border-gray-300" />

      {/* Contact Info */}
      <div>
        <p className="text-sm font-medium text-indigo-600 uppercase mb-3">Contact Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
          <span className="font-medium">Email:</span>
          <span className="text-blue-600 break-words">{userData.email}</span>

          <span className="font-medium">Phone:</span>
          {isEdit ? (
            <input
              name="phone"
              type="text"
              value={userData.phone || ""}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          ) : (
            <span className="text-blue-600">{userData.phone || "N/A"}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEdit ? (
            <div className="flex flex-col gap-2">
              <input
                className="p-2 border rounded-lg w-full focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
                name="line1"
                type="text"
                placeholder="Street, Area"
                value={userData.address?.line1 || ""}
                onChange={handleAddressChange}
              />
              <input
                className="p-2 border rounded-lg w-full focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
                name="line2"
                type="text"
                placeholder="City, State - Pincode"
                value={userData.address?.line2 || ""}
                onChange={handleAddressChange}
              />
            </div>
          ) : (
            <span className="text-gray-500">
              {userData.address?.line1 || "N/A"}
              <br />
              {userData.address?.line2 || ""}
            </span>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-sm font-medium text-indigo-600 uppercase mb-3">Basic Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
          <span className="font-medium">Gender:</span>
          {isEdit ? (
            <select
              name="gender"
              value={userData.gender || "Not Selected"}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Not Selected">Prefer not to say</option>
            </select>
          ) : (
            <span className="text-gray-500">{userData.gender || "N/A"}</span>
          )}

          <span className="font-medium">Date of Birth:</span>
          {isEdit ? (
            <input
              type="date"
              name="dob"
              value={userData.dob ? userData.dob.split('T')[0] : ""}
              onChange={handleChange}
              className="p-2 border rounded-lg w-full focus:outline-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          ) : (
            <span className="text-gray-500">{userData.dob ? new Date(userData.dob).toLocaleDateString() : "N/A"}</span>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className="flex justify-center mt-4">
        <button
          className="px-8 py-2 rounded-full border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"
          onClick={isEdit ? updateUserData : () => setIsEdit(true)}
        >
          {isEdit ? "Save Information" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
