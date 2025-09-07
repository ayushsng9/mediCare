import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import Appointment from './pages/Appointment.jsx'
import MyProfile from './pages/MyProfile.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router = createBrowserRouter([
  { 
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/doctors",
        element:<Doctors/>
      },
      {
        path:"/doctors/:speciality",
        element:<Doctors/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      },
      {
        path:"/my-appointments",
        element:<MyAppointments/>
      },
      {
        path:"/appointment/:docId",
        element:<Appointment/>
      },
      {
        path:"/my-profile",
        element:<MyProfile/>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
    <RouterProvider router={router}/>
    </Provider>
)
