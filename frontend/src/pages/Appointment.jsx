import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RelatedDoctors from "./RelatedDoctors";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors } from "../store/appSlice";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Appointment() {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [userAppointments, setUserAppointments] = useState([]);

  const doctorList = useSelector((state) => state.apps.doctors);
  const { token, backendUrl } = useSelector((state) => state.apps);

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Fetch user's appointments
  const getUserAppointments = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success && Array.isArray(data.appointments)) {
        setUserAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  // Fetch doctor info
  const getDocInfo = async () => {
    const info = doctorList.find((doc) => doc._id === docId) || null;
    setDocInfo(info);
  };

  // Generate available slots, skipping already booked ones
  const getAvailableSlots = () => {
    if (!docInfo) return;

    setDocSlots([]);
    const today = new Date();

    // Get booked slots for this doctor
    const bookedSlots = userAppointments
      .filter((appt) => appt.docId === docInfo._id)
      .map((appt) => new Date(appt.slot).getTime());

    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currDate < endTime) {
        const formatTime = currDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        if (!bookedSlots.includes(currDate.getTime())) {
          timeSlots.push({
            dateTime: new Date(currDate),
            time: formatTime,
          });
        }

        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      if (timeSlots.length) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };

  // Book appointment
  const book = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.warn("Select a time slot");
      return;
    }

    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // refresh booked slots

        // refresh doctor info from backend
        const res = await axios.get(`${backendUrl}/api/v1/doctor/list`);
        if (res.data.success) {
          dispatch(setDoctors(res.data.data));
          const updatedDoc = res.data.data.find((doc) => doc._id === docId);
          setDocInfo(updatedDoc);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
      console.error("Error booking appointment:", error.message);
    }
  };

  useEffect(() => {
    getDocInfo();
  }, [doctorList, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo, userAppointments]);

  return (
    docInfo && (
      <div>
        {/*------------- Doctor Details -----------------*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-indigo-500 w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee : <span className="text-gray-600 ">Rs {docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* ------------- Booking Slots ------------ */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map(
                (item, index) =>
                  item.length > 0 && (
                    <div
                      key={index}
                      onClick={() => {
                        setSlotIndex(index);
                        setSlotTime("");
                      }}
                      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                        slotIndex === index ? "bg-indigo-500 text-white" : "border border-gray-200"
                      }`}
                    >
                      <p>{item[0] && weekDays[item[0].dateTime.getDay()]}</p>
                      <p>{item[0] && item[0].dateTime.getDate()}</p>
                    </div>
                  )
              )}
          </div>

          <div className="flex items-center gap-4 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime ? "bg-indigo-500 text-white" : "text-gray-600 border border-gray-300"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <div>
            <button
              onClick={book}
              className="bg-indigo-500 text-white text-sm font-light px-14 py-3 rounded-full my-6"
            >
              Book an Appointment
            </button>
          </div>
        </div>

        {/* ----------- Related Doctors -------------- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
