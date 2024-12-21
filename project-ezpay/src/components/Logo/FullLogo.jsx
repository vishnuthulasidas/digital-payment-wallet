import React from 'react'
import LogoIcon from '../../assets/logo-icon-color.svg'
const FullLogo = () => {
  return (
    <div className='flex items-end text-5xl font-semibold'>
        <img src={LogoIcon} alt="logo" />
        <div>
        <span className='text-secondary'>Ez</span>
        <span className='text-primary'>Pay</span>
        </div>
    </div>
  )
}

export default FullLogo
