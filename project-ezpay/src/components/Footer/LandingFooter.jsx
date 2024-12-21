import React from 'react'
import Button from '../Button/Button'
import FullLogoBlack from '../Logo/FullLogoBlack'
import LogoBlack from "../../assets/logo-icon-black.svg"
import { useNavigate } from 'react-router-dom'

const LandingFooter = () => {
  const navigate = useNavigate()
  return (
    <div className=' bg-[#E0E0E0] mt-20 px-36 py-10 font-aleo flex flex-col items-start relative overflow-hidden'>
      <div className='flex  font-semibold items-start gap-10'>
        <div className='flex flex-col text-3xl'>
        Ready to Simplify Your Payments?   
        <span>Join EzPay Today!</span>
        </div>
        <Button text="Get Started" clickHandler={()=>navigate("/auth")}/>
      </div>
      <div>
        <FullLogoBlack/>
        <div>Copyright © 2025 EzPay Technologies. All rights reserved</div>
      </div>
      <img className='absolute -bottom-96 -right-60 opacity-20 w-[800px]' src={LogoBlack} />
    </div>
  )
}

export default LandingFooter
