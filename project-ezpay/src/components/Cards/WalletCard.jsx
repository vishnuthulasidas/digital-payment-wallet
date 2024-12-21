import React from 'react'
import walletIcon from '../../assets/wallet-symbol.svg'
import addIcon from '../../assets/add-symbol.svg'
import { useNavigate } from 'react-router-dom'

const WalletCard = ({id,name,balance,created_at,deleter}) => {
  const navigate=useNavigate()
  return (
    <div className='bg-gradient-to-br font-aleo from-blue-900 to-blue-950 border-gray-400 p-5 rounded-lg text-white flex flex-col max-w-[800px] shadow-xl'>
      <div className='flex gap-3 items-center justify-between w-full'>
        <div className='flex gap-4'>
          <img src={walletIcon} className='w-[32px]' />
          <div className=''>
            <div className='md:hidden font-semibold'>&#8377; {balance}</div>
            <div className='text-lg font-semibold'>{name}</div>
            <div className='hidden md:block text-xs text-gray-300'>Created on {created_at}</div>
          </div>
        </div>
        <div className='flex gap-3'>
            <img src={addIcon} className='w-[35px] ml-10 cursor-pointer' onClick={() => navigate(`/dashboard/transfer?to=${id}`)} />
          <button className='border border-white px-2 rounded-lg' onClick={() => deleter(id)}>
            delete
          </button>
        </div>
      </div>
      <div className='hidden md:block font-semibold text-xl mt-5'>&#8377; {balance}</div>
    </div>
  )
}

export default WalletCard
