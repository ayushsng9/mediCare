import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllDoctors, changeAvailability } from '../../store/adminSlice'

function DoctorsList() {
  const dispatch = useDispatch()
  const { adminToken, doctors } = useSelector(state => state.admin)

  useEffect(() => {
    if (adminToken) {
      dispatch(getAllDoctors())
    }
  }, [adminToken, dispatch])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="duration-500 w-56 h-56 object-contain bg-indigo-50"
            />
            <div className="p-2">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-neutral-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => dispatch(changeAvailability(item._id))}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
