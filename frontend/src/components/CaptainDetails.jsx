import React from "react";

const CaptainDetails = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <img className='h-16 w-16 rounded-full object-cover border-2 border-gray-100' src="https://i.pinimg.com/736x/29/48/de/2948de96e0bfc4c6152020cb7946e9ff.jpg" alt="profile"/>
                <h2 className='text-xl font-semibold capitalize'>Alexa Falen</h2>
            </div>
            <div className='text-right'>
                <h4 className='text-2xl font-bold'>₹295.30</h4>
                <p className='text-xs uppercase tracking-wide text-gray-400 font-medium'>Earned</p>
            </div>
        </div>

        {/* Stats Grid - Fixed alignment and equal spacing */}
        <div className='flex items-center justify-around bg-yellow-200 rounded-2xl mt-6 py-6 shadow-sm border border-gray-100'>
            <div className='text-center'>
                <i className ="text-2xl font-light text-gray-500 ri-timer-2-line"></i>
                <h5 className='text-lg font-bold mt-1'>10.2</h5>
                <p className='text-[10px] uppercase text-gray-400 font-bold'>Online Hours</p>
            </div>
            <div className='text-center border-x border-gray-200 px-8'>
                <i className ="text-2xl font-light text-gray-500 ri-speed-up-line"></i>
                <h5 className='text-lg font-bold mt-1'>30.5</h5>
                <p className='text-[10px] uppercase text-gray-400 font-bold'>Speed KM/H</p>
            </div>
            <div className='text-center'>
                <i className ="text-2xl font-light text-gray-500 ri-booklet-fill"></i>
                <h5 className='text-lg font-bold mt-1'>12</h5>
                <p className='text-[10px] uppercase text-gray-400 font-bold'>Jobs Done</p>
            </div>
        </div>
        </div>
    )
}

export default CaptainDetails;