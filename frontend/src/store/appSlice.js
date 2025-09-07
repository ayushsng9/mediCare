import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  doctors: [],
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  token: localStorage.getItem("token") || "",
  userProfileData: null,
};

const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setBackendUrl: (state, action) => {
      state.backendUrl = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
  },
});

export const fetchDoctors = () => async (dispatch, getState) => {
  const { backendUrl } = getState().apps;
  try {
    const { data } = await axios.get(`${backendUrl}/api/v1/doctor/list`);
    if (data.success) {
      dispatch(setDoctors(data.data));
    }
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
  }
};

export const fetchUserData = () => async (dispatch, getState) => {
  const { backendUrl, token } = getState().apps;
  if (!token) return;
  try {
    const { data } = await axios.get(`${backendUrl}/api/v1/user/get-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (data.success) {
      dispatch(setUserProfileData(data.data));
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    if (error.response?.status === 401) {
      dispatch(setToken(""));
      dispatch(setUserProfileData(null));
    }
  }
};

export const { setDoctors, setBackendUrl, setToken, setUserProfileData } =
  appSlice.actions;
export default appSlice.reducer;
