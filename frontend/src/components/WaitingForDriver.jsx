import React from 'react'

const WaitingForDriver = (props) => {
    return (
         <>
      <div className='w-full'>
        <h5
          className="absolute p-1 text-center w-[90%] top-0"
          onClick={() => {
            props.WaitingForDriver(false);
          }}
        >
          <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-xl font-semibold pb-8 text-center">
          Waiting for Driver{" "}
        </h3>
        <div className="flex flex-col justify-between items-center w-full">
          <div className='flex w-full justify-between' >
            <div className='flex '>
                <img
            className="h-15 rounded full "
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n"
            alt=""
          />
            <img  className='h-15  rounded full '
            src="https://cdn-icons-png.flaticon.com/512/5283/5283021.png" alt=""  /></div>
          <div className='text-right pb-3'>
            <h2 className=' '>Dharm Gora</h2>
            <h4 className=' text-xl font-medium '>RJ21 2433</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          </div>
          </div>
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-lg">564/11-A</h3>
                <p>Kaikondrahailli Bangluru, Karnataka</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 text-bold ml-3 border-b-2 border-gray-200 pb-3">
              <i className="ri-map-pin-2-line"></i>
              <div>
                <h3 className="text-lg">123/31-C</h3>
                <p>Kishanpura Bhopal, MP</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 text-bold ml-3">
              <i className="ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg">193.20$</h3>
                <p>Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}


export default WaitingForDriver