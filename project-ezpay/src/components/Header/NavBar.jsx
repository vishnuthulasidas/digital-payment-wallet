import React from 'react'
import homeBoxIcon from '../../assets/home-box-icon.svg'
import walletIcon from '../../assets/wallet-icon.svg'
import historyIcon from '../../assets/history-icon.svg'
import transferIcon from '../../assets/transfer-icon.svg'
import peopleIcon from '../../assets/people-icon.svg'
import businessIcon from '../../assets/business-icon.svg'
import servicesIcon from '../../assets/services-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='relative hidden md:flex bg-myBlue text-white py-4 px-9 gap-7 items-end'>
        <NavLink
        to='home'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={homeBoxIcon} className='w-10' alt="" />
            <p>Home</p>
        </NavLink>

        <NavLink 
        to='wallet'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={walletIcon} className='w-10' alt="" />
            <p>Wallets</p>
        </NavLink>

        <NavLink 
        to='history'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={historyIcon} className='w-10' alt="" />
            <p>History</p>
        </NavLink>

        <NavLink 
        to='transfer'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={transferIcon} className='w-10' alt="" />
            <p>Transfer</p>
        </NavLink>

        <NavLink 
        to='people'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={peopleIcon} className='w-10' alt="" />
            <p>People</p>
        </NavLink>

        {/* <NavLink 
        to='/business'
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={businessIcon} className='w-10' alt="" />
            <p>Business</p>
        </NavLink> */}

        <div
        // to='services' 
        className='flex flex-col w-fit items-center gap-1 cursor-not-allowed hover:text-secondary'>
            <img src={servicesIcon} className='w-10' alt="" />
            <p>Services</p>
        </div>

        <NavLink
        to='profile' 
        className='flex flex-col w-fit items-center gap-1 cursor-pointer hover:text-secondary'>
            <img src={profileIcon} className='w-10' alt="" />
            <p>Profile</p>
        </NavLink>

    </nav>
  )
}

export default NavBar
