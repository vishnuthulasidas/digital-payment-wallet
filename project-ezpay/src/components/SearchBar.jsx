import React, { useEffect, useState } from 'react';
import { userService } from '../api';
import MoneyPortal from './SendMoneyPortal';

const SearchBar = ({ searchTerm,clear }) => {
  const [data, setData] = useState(null); // Holds the single user data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setData(null);
      return;
    }

    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Assuming API expects "searchTerm@ezpay" for exact match
        const response = await userService.searchUsers(`${searchTerm}@ezpay`);
        if (response) {
          setData(response); // API response contains the user object
        } else {
          setData(null); // No user found
        }
      } catch (err) {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [searchTerm]);

  if (!searchTerm) return null; // Do not render if no search term

  return (
    <div className='absolute z-50 top-10 w-full left-0 flex flex-col gap-2 p-3 bg-slate-200 rounded-lg shadow-xl border border-gray-500'>
      {/* Loading State */}
      {isLoading && <div className='text-center text-gray-500'>Loading...</div>}

      {/* Error State */}
      {error && <div className='text-center text-red-500'>{error}</div>}

      {/* Render User */}
      {data ? (
        <div
          key={data.username}
          className='flex items-center gap-3 border-b border-secondary pb-3 cursor-pointer'
            onClick={() =>setPortalOpen(true)}
        >
          <img
            src={`https://ui-avatars.com/api/?background=143458&color=fff&name=${data.name}`}
            alt={data.name}
            className='w-10 h-10 rounded-full'
          />
          <div>
            <div className='font-semibold'>{data.name}</div>
            <div className='text-xs text-gray-400'>{data.username}</div>
          </div>
        </div>
      ) : (
        <div className='text-center text-gray-500'>No user found.</div>
      )}
      {portalOpen && <MoneyPortal isOpen={portalOpen} reciever={data.username} onClose={() => {setPortalOpen(false);clear()}}/>}
    </div>
  );
};

export default SearchBar;
