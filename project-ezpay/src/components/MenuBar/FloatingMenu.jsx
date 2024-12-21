import React from 'react'
import walletLogo from '../../assets/wallet-logo.svg'
import ezBussinessLogo from '../../assets/ez-bussiness-logo.svg'
import { useNavigate } from 'react-router-dom'
const FloatingMenu = ({visibility}) => {
  const navigate = useNavigate()
  return (
    <div className={`absolute  right-96 w-fit shadow-2xl border border-gray-400 rounded-xl overflow-hidden bg-white ${!visibility&&"hidden"}`}>
      <div className='cursor-pointer flex gap-2 items-center border-b border-gray-400 p-5 pb-4 hover:bg-teal-100'
      onClick={()=>navigate("/auth")}
      >
        <img src={walletLogo} className='w-14' />
        <div>
            <div className='font-semibold'>EzWallet</div>
            <div className='w-[250px] text-xs'>Manage your money, track expenses, and send payments effortlessly with Ez Wallet.</div>
        </div>
      </div>

      <div className='cursor-not-allowed flex gap-2 items-center p-5 pt-4 hover:bg-teal-100 '>
        <img src={ezBussinessLogo} className='w-14' />
        <div>
            <div className='font-semibold'>EzPay for Bussiness</div>
            <div className='w-[250px] text-xs'>Simplify transactions and grow your business with Ez Pay for Business.</div>
        </div>
      </div>


    </div>
  )
}

export default FloatingMenu
