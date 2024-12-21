import React, { useState,useEffect } from 'react';
import ezPayLogo from '../../assets/logo-symbol.svg';
import lightningIcon from '../../assets/lightning-symbol.svg';
import hamburgerIcon from '../../assets/hamburger-menu-symbol.svg';
import crossSymbol from '../../assets/cross-symbol.svg';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

import { userService } from '../../api';
import SearchBar from '../SearchBar';

const GreeterBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // function to return good morning, afternoon or evening
  const greetUser = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['userProfile'],   // The query key as an array
    queryFn: userService.getCurrentUserProfile, // The function to fetch the data
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative flex justify-between px-3 py-3 md:px-6 items-center">
      <div className="grid md:flex items-center gap-5 w-full md:w-1/2">
        <div className="flex gap-2 items-center">
          <img src={ezPayLogo} alt="EzPay Logo" />
          <div className="flex-grow">
            <h1 className="font-medium text-xl">Hello, {data.name}</h1>
            <h3 className="text-xs">{greetUser()}</h3>
          </div>
          <img
            src={hamburgerIcon}
            className="md:hidden cursor-pointer"
            alt="Menu"
            onClick={toggleMenu}
          />
        </div>
        <div className="relative flex border-2 border-myBlue rounded-lg px-3 py-2 gap-2 flex-grow">
          <img src={lightningIcon} alt="Lightning Icon" />
          <input
            type="text"
            name=""
            id=""
            className="outline-none flex-grow text-xs md:text-sm"
            placeholder="Quick Send | Type the recipient name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchBar searchTerm={searchInput} clear={()=>setSearchInput("")}/>
        </div>
      </div>
      <button 
       onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/auth';
          }} 
        className="hidden md:block bg-red-600 py-2 px-4 rounded-md text-white font-medium">
        Logout
      </button>

      {/* Sliding Menu */}
      {menuOpen && (
        <div className="z-50 fixed top-0 right-0 h-screen w-3/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <img
              src={crossSymbol}
              alt="Close Menu"
              className="w-6 h-6 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <ul className="flex flex-col gap-6 p-6">
            <NavLink to="/dashboard/home"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">Home</li></NavLink>
            <NavLink to="/dashboard/wallet"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">Wallets</li></NavLink>
            <NavLink to="/dashboard/history"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">History</li></NavLink>
            <NavLink to="/dashboard/transfer"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">Transfer</li></NavLink>
            <NavLink to="/dashboard/people"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">People</li></NavLink>
            <div ><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">Services</li></div>
            <NavLink to="/dashboard/profile"><li onClick={()=>toggleMenu()} className="text-base font-medium hover:text-myBlue cursor-pointer">Profile</li></NavLink>
            
            <button onClick={()=>{}}><li className="text-base font-medium text-red-600 border-t-2 mt-5 border-black py-3 hover:text-myBlue cursor-pointer">Logout</li></button>

          </ul>
        </div>
      )}

      {/* Overlay for menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default GreeterBar;
