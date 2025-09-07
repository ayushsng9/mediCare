import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    adminToken: localStorage.getItem("adminToken") || '',
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    doctors: [],
    appointments : [],
    dashData : {}
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminToken: (state, action) => {
            state.adminToken = action.payload;
        },
        setBackendUrl: (state, action) => {
            state.backendUrl = action.payload.backendUrl;
        },
        logoutAdmin: (state) => {
            state.adminToken = '';
            localStorage.removeItem("adminToken");
        },
        setDoctors: (state, action) => {
            state.doctors = action.payload;
        },
        updateDoctorAvailability: (state, action) => {
            const { docId } = action.payload;
            state.doctors = state.doctors.map(doc =>
                doc._id === docId ? { ...doc, available: !doc.available } : doc
            );
        },
        setAppointments : (state,action) => {
            state.appointments = action.payload
        },
        setDashData : (state,action) => {
            state.dashData = action.payload
        }
    }
});

export const { setAdminToken, setBackendUrl, logoutAdmin, setDoctors , updateDoctorAvailability ,setAppointments ,setDashData} = adminSlice.actions;


export const getAllDoctors = () => async (dispatch, getState) => {
    const { adminToken, backendUrl } = getState().admin;
    try {
        const { data } = await axios.post(
            backendUrl + '/api/v1/admin/all-doctors',
            {},
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if (data.success) {
            dispatch(setDoctors(data.data.doctors));
        }
    } catch (error) {
        toast.error("Can't fetch doctors");
    }
};

export const getAllAppointments = () => async(dispatch,getState) => {
    const {adminToken,backendUrl} = getState().admin;
    try {
        const { data } = await axios.post(
            backendUrl + '/api/v1/admin/all-appointments',
            {},
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if(data.success)
        {
            dispatch(setAppointments(data.data.appointments));
        }
    } catch (error) {
        toast.error("Cant fetch appointments")
    }
};

export const changeAvailability = (docId) => async (dispatch, getState) => {
    const { adminToken, backendUrl } = getState().admin;
    try {
        const { data } = await axios.post(
            `${backendUrl}/api/v1/admin/change-availability`,
            { docId },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        if (data.success) {
            dispatch(updateDoctorAvailability({ docId }));
        } else {
            toast.error(data.message);   
        }
    } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error("Failed to update availability");
    }
};

export const cancelAppointment = (appointmentId) => async (dispatch, getState) => {
  const { adminToken, backendUrl } = getState().admin;
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/v1/admin/cancel-appointment`,
      { appointmentId },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (data.success) {
      toast.success(data.message);

      // refresh the list after cancelling
      dispatch(getAllAppointments());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

export const getDashData = () => async(dispatch,getState) =>{
    const { adminToken, backendUrl } = getState().admin;
    try {
        const {data} = await axios.get(backendUrl+'/api/v1/admin/dashboard',{ headers: { Authorization: `Bearer ${adminToken}`}})
        if(data.success)
        {   
            dispatch(setDashData(data.data.dashData));
        }   
        else
        {
            toast.error("Cant fetch dashboard data");
        }
    } catch (error) {
        toast.error("Can fetch Dasboard data");
    }
}


export default adminSlice.reducer;
