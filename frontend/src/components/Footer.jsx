import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img className='mb-5 w-60' src = {assets.logo} alt="" />
                <p className='w-full md:2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, molestiae? Totam consequuntur ea aspernatur quo porro architecto earum, voluptatem ad nemo sequi? Fugiat exercitationem doloribus vel temporibus dolores possimus quasi.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Get In Touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>medicare@gmail.com</li>
                </ul>
            </div>
        </div>

        <div className='py-5 text-sm text-center'>
            <hr />
            <p>Copyright © 2025 MediCare - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
