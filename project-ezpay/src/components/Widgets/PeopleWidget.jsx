import React from 'react'
import addMoreIcon from '../../assets/add more icon-black.svg'
import personIcon from '../../assets/person-icon-black.svg'
import personIconOrange from '../../assets/person-icon-orange.svg'
const PeopleWidget = ({userSelector}) => {
  return (
    <div className='bg-white border max-w-[600px] border-gray-400 p-4 h-fit shadow-lg rounded-lg md:col-start-1 md:col-span-1 m-auto w-full'>
      <div className='font-bold text-lg'>People</div>
    <div className='font-semibold text-gray-600 text-sm mt-1'>Favorites</div>
      <div className='p-3 flex items-end gap-5 w-full flex-wrap border-b-2 border-gray-400'>
        <div 
        onClick={()=>userSelector('Vishnu')}
        className='flex flex-col gap-1 items-center w-[10%] md:w-[12%] cursor-pointer'>
            <img src="https://avatar.iran.liara.run/public/boy?name=vt" alt="" />
            <p className=''>Vishnu</p>
        </div>
        <div className='flex flex-col gap-1 items-center w-[20%] md:w-[15%]'>
            <img src={addMoreIcon} alt="" />
            <p className=''>Add</p>
        </div>
      </div>
    <div className='font-semibold text-gray-600 text-sm mt-2'>Recent</div>
      <div className='p-3 flex gap-5 w-full flex-wrap'>
        <div className='flex flex-col gap-1 items-center w-[10%] md:w-[12%]'>
            <img src="https://avatar.iran.liara.run/public?name=a" alt="" />
            <p className=''>Amit</p>
        </div>
        <div className='flex flex-col gap-1 items-center w-[10%] md:w-[12%]'>
            <img src="https://avatar.iran.liara.run/public?name=b" alt="" />
            <p className=''>Raj</p>
        </div>
        <div className='flex flex-col gap-1 items-center w-[10%] md:w-[12%]'>
            <img src="https://avatar.iran.liara.run/public/girl?name=c" alt="" />
            <p className=''>Priya</p>
        </div>
        <div className='flex flex-col gap-1 items-center w-[10%] md:w-[12%]'>
            <img src="https://avatar.iran.liara.run/public?name=d" alt="" />
            <p className=''>Arjun</p>
        </div>
        <div className='flex flex-col gap-1 items-center w-[10%] md:w-[12%]'>
            <img src="https://avatar.iran.liara.run/public/girl?name=e" alt="" />
            <p className=''>Anjali</p>
        </div>
      </div>
    </div>
  )
}

export default PeopleWidget
