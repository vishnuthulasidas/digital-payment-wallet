import React, { useState } from 'react'
import WalletCard from './Cards/WalletCard'
import addIcon from '../assets/add-symbol.svg'
import { walletService } from '../api'
import formatDate from '../utils/dateFormater'
import WalletMakingPortal from './WalletMakingPortal'
import { toast } from 'react-toastify'

const WalletOverview = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ['wallets'],   // The query key as an array
    queryFn: walletService.getWallets, // The function to fetch the data
  });

const queryClient = useQueryClient();

const handleDeleteWallet = async (walletId) => {
  try {
    await walletService.deleteWallet(walletId);
    toast('🗑️ Wallet deleted successfully');
    // Refetch wallets after deletion
    queryClient.invalidateQueries(['wallets']);
  } catch (error) {
    console.error('Failed to delete wallet:', error);
  }
};

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  
  // calculate total balance
  const totalBalance = data.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <div className='bg-white border border-gray-400 p-4 shadow-lg rounded-lg md:min-h-[500px]'>
      <div className='font-bold text-lg'>Total Balance</div>
      <div className='font-bold text-2xl mt-3'>&#8377; {totalBalance}</div>
      <div className='font-bold text-gray-500 mt-5'>My Wallets</div>
      <div className='py-3 flex flex-col md:flex-row gap-3 flex-wrap'>
        {data.map(wallet => (
          <WalletCard key={wallet.id} id={wallet._id} name={wallet.name} balance={wallet.balance} created_at={formatDate(wallet.createdAt)} deleter={handleDeleteWallet} />
        ))}
        <div 
        onClick={()=>setIsPortalOpen(true)}
        className='cursor-pointer bg-black p-5 rounded-lg  text-white flex gap-3 justify-center items-center max-w-[800px] md:min-h-36 md:min-w-80 shadow-xl'>
          <img src={addIcon} alt="" />
          <div className='font-semibold'>Add More</div>
        </div>
      </div>
      <WalletMakingPortal isOpen={isPortalOpen} onClose={()=>setIsPortalOpen(false) }/>
    </div>
  )
}

export default WalletOverview