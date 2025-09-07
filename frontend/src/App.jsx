import {useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useDispatch } from "react-redux";
import { fetchDoctors, fetchUserData } from "./store/appSlice";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchUserData());
  }, [dispatch]);
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
