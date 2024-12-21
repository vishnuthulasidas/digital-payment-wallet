import {useState} from 'react'
import qrCodeIcon from '../../assets/qr-code-symbol.svg'
import MoneyPortal from '../SendMoneyPortal'
import { useNavigate } from 'react-router-dom'


const QuickSendWidget = () => {
  const[moneyPortalOpen, setMoneyPortalOpen] = useState(false)
  const navigate=useNavigate()
  return (
    <div className='md:bg-white md:shadow-lg md:rounded-lg md:p-4 md:border md:border-gray-400 flex flex-col items-center justify-center gap-3 md:col-start-2 md:col-span-2'>
      <div className='flex justify-center gap-2 md:gap-10 w-full'>
        <button className='bg-secondary w-1/2 md:w-1/3 text-white px-7 py-2 rounded-lg font-medium'
        onClick={()=>setMoneyPortalOpen(true)}
        >Send</button>
        <button className='bg-primary w-1/2 md:w-1/3 text-white px-7 py-2 rounded-lg font-medium'
        onClick={()=>navigate('/dashboard/transfer?from=bank')}
        >Add Money</button>
      </div>
      <div className='md:hidden bg-black w-full text-white flex gap-2 justify-center px-7 py-3 rounded'>
        <img src={qrCodeIcon} alt="" />
        <p>Scan QR Code</p>
      </div>
      <MoneyPortal isOpen={moneyPortalOpen} onClose={()=>setMoneyPortalOpen(false)} />
    </div>
  )
}

export default QuickSendWidget
