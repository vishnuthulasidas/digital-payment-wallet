import React from 'react'
import Hand3DImage from "../../assets/3d-hand.svg"
import LogoBlack from "../../assets/logo-icon-black.svg"
const index = () => {
  return (
    <div className="flex items-center relative justify-between mt-20">
      <div className='text-secondary font-semibold'>
        <div className="text-6xl flex flex-col">
        <span>Simplify</span> 
        Your Payments with EzPay</div>
        <div className="text-4xl mt-3" >
          <span
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
          data-easing="linear"
          >Fast. </span>
          <span
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
          data-easing="linear"
          >Secure. </span>
          <span
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="900"
          data-easing="linear"
          >Effortless.</span></div>
      </div>
      <img className='tilt-image' src={Hand3DImage} />
      <img className='moving-rotating-element absolute -top-56 -left-96 opacity-20 w-[800px] -z-9' src={LogoBlack} />
    </div>
  )
}

export default index
