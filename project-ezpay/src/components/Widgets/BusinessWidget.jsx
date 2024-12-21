import React from 'react'
import addMoreIcon from '../../assets/add more icon-black.svg'
const BusinessWidget = () => {
  return (
    <div className='bg-white border border-gray-400 p-4 shadow-lg rounded-lg md:col-start-2 md:row-start-2 md:row-span-2'>
      <div className='font-bold text-lg'>Shops/Business</div>
      <div className='p-3'>
        <div className='flex flex-col gap-1 items-center w-fit'>
            <img src={addMoreIcon} alt="" />
            <p className=''>Add</p>
        </div>
      </div>
    </div>
  )
}

export default BusinessWidget
