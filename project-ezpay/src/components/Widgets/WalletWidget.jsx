import React from 'react'
import walletIcon from '../../assets/wallet-symbol.svg'
import { useQuery } from '@tanstack/react-query'
import { walletService } from '../../api'
const WalletWidget = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['wallets'],   // The query key as an array
    queryFn: walletService.getWallets, // The function to fetch the data
  });


  if (isLoading) return <div>Loading...</div>;
  
  // calculate total balance
  const totalBalance = data.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className='bg-white p-4 border border-gray-400  rounded-lg flex flex-col gap-2 shadow-lg md:col-start-1 md:row-start-1 md:row-span-3'>
      <h3 className='text-lg font-semibold'>Total Balance</h3>
      <h1 className='text-4xl font-bold'>&#8377; {totalBalance}</h1>
      <div className='flex flex-col gap-2'>
        <div className='flex text-gray-500 justify-between mb-2'>
            <p className='font-semibold'>My Wallets</p>
            <span className='text-blue-500 underline'>view all</span>
        </div>
        
        {data.slice(0,2).map(wallet => (
          <div className='bg-primary flex gap-3 p-4 rounded-lg text-white mb-3'>
          <img src={walletIcon} className='w-[8%] max-w-[25px]' alt="" />
          <div>
              <p className='font-semibold text-lg'>&#8377; {wallet.balance}</p>
              <p className='font-light text-sm'>{wallet.name}</p>
          </div>
      </div>))
        }
        
      </div>
    </div>
  )
}

export default WalletWidget
