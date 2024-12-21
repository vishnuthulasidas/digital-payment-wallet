import React from 'react'
import addMoreIcon from '../../assets/add more icon-black.svg'
import mobileIcon from '../../assets/mobile-icon-black.svg'
import electricityIcon from '../../assets/electricity-icon-black.svg'
const ServicesWidget = () => {
  return (
    <div className='bg-white p-4 border border-gray-400 shadow-lg rounded-lg'>
      <div className='font-bold text-lg'>Services</div>
      <div className='p-3 flex gap-5 mt-1 items-end'>
        <div className='flex flex-col gap-1 items-center min-w-[20%]'>
            <img src={mobileIcon} alt="" />
            <p className='font-medium'>Recharges</p>
        </div>
        <div className='flex flex-col gap-1 items-center min-w-[20%]'>
            <img src={electricityIcon} alt="" />
            <p className='font-medium'>Electricity</p>
        </div>
        <div className='flex flex-col gap-1 items-center min-w-[20%]'>
            <img src={addMoreIcon} alt="" />
            <p className='font-medium'>More</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesWidget
