import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  doctorToken: localStorage.getItem("doctorToken") || "",
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  appointments: [],
  dashData: {},
  doctorProfileData: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorToken: (state, action) => {
      state.doctorToken = action.payload;
    },
    setBackendUrl: (state, action) => {
      state.backendUrl = action.payload.backendUrl;
    },
    logoutDoctor: (state) => {
      state.doctorToken = "";
      localStorage.removeItem("doctorToken");
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setDashData: (state, action) => {
      state.dashData = action.payload;
    },
    setDoctorProfileData: (state, action) => {
      state.doctorProfileData = action.payload;
    },
  },
});

export const getAppointments = () => async (dispatch, getState) => {
  const { doctorToken, backendUrl } = getState().doctor;
  try {
    const { data } = await axios.get(
      backendUrl + "/api/v1/doctor/appointments",
      { headers: { Authorization: `Bearer ${doctorToken}` } }
    );
    if (data.success) {
      dispatch(setAppointments(data.data.appointments.reverse()));
    }
  } catch (error) {
    toast.error("Cant fetch appointments");
  }
};

export const completeAppointment =
  (appointmentId) => async (dispatch, getState) => {
    const { doctorToken, backendUrl } = getState().doctor;
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/doctor/complete-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (data.success) {
        toast.success("Appointment completed");
        dispatch(getAppointments());
      }
    } catch (err) {
      toast.error("Failed to complete appointment");
    }
  };

export const cancelAppointment =
  (appointmentId) => async (dispatch, getState) => {
    const { doctorToken, backendUrl } = getState().doctor;
    try {
      const { data } = await axios.post(
        backendUrl + "/api/v1/doctor/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${doctorToken}` } }
      );
      if (data.success) {
        toast.success("Appointment cancelled");
        dispatch(getAppointments());
      }
    } catch (err) {
      toast.error("Failed to cancel appointment");
    }
  };

export const getDashData = () => async (dispatch, getState) => {
  const { doctorToken, backendUrl } = getState().doctor;
  try {
    const { data } = await axios.get(backendUrl + "/api/v1/doctor/dashboard", {
      headers: { Authorization: `Bearer ${doctorToken}` },
    });
    if (data.success) {
      dispatch(setDashData(data.data.dashData));
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};

export const getDoctorProfile = () => async (dispatch, getState) => {
  const { doctorToken, backendUrl } = getState().doctor;
  try {
    const { data } = await axios.get(`${backendUrl}/api/v1/doctor/profile`, {
      headers: { Authorization: `Bearer ${doctorToken}` },
    });

    if (data.success) {
      dispatch(setDoctorProfileData(data.data));
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const updateDoctorProfile = (payload) => async (dispatch, getState) => {
  const { doctorToken, backendUrl } = getState().doctor;
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/v1/doctor/update-profile`,
      payload,
      { headers: { Authorization: `Bearer ${doctorToken}` } }
    );

    if (data.success) {
      toast.success(data.message);
      dispatch(setDoctorProfileData(data.data));
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update profile");
  }
};

export const {
  setBackendUrl,
  setDoctorToken,
  logoutDoctor,
  setAppointments,
  setDashData,
  setDoctorProfileData,
} = doctorSlice.actions;

export default doctorSlice.reducer;
