import React from 'react'

const ColorCard = ({color_num,title,content,aos_type="fade-up"}) => {
    const bgcolors = {
        1:"bg-[#AED9E0]",
        2:"bg-[#83C5BE]",
        3:"bg-[#FFDDD2]",
        4:"bg-[#E29578]",
    }
  return (
    <div className={`w-[400px] p-8 ${bgcolors[color_num]}`}
    data-aos={aos_type}
    >
      <div className='font-bold text-xl'>{title}</div>
      <div className='text-lg mt-4'>{content}</div>
    </div>
  )
}

export default ColorCard
