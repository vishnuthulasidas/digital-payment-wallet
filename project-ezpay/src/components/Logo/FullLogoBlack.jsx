import React from 'react'
import LogoIcon from '../../assets/logo-icon-black.svg'
const FullLogoBlack = () => {
    return (
        <div className='flex items-center text-5xl font-semibold font-aleo relative -left-10'>
            <img src={LogoIcon} alt="logo" className='w-32'/>
            <div className='relative -left-5'>
            <span>Ez</span>
            <span>Pay</span>
            </div>
        </div>
      )
}

export default FullLogoBlack
