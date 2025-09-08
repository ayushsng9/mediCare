import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import DashBoard from './pages/admin/DashBoard.jsx'
import AllAppointments from './pages/admin/AllAppointments.jsx'
import AddDoctor from './pages/admin/AddDoctor.jsx'
import DoctorsList from './pages/admin/DoctorsList.jsx'
import DoctorAppointment from './pages/doctor/DoctorAppointment.jsx'
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import DoctorProfile from './pages/doctor/DoctorProfile.jsx'

const router = createBrowserRouter([
  { 
    path:'/',
    element:<App/>,
    children:[
      /* Admin Routes */
      { path: 'login', element: <Login /> },
      { path: 'admin-dashboard', element: <DashBoard /> },
      { path: 'all-appointments', element: <AllAppointments /> },
      { path: 'add-doctor', element: <AddDoctor /> },
      { path: 'doctor-list', element: <DoctorsList /> },

      /* Doctor Routes */
      { path: 'doctor-dashboard', element: <DoctorDashboard /> },
      { path: 'doctor-appointments', element: <DoctorAppointment /> },
      { path: 'doctor-profile', element : <DoctorProfile/> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
    <RouterProvider router={router}/>
    </Provider>
)

