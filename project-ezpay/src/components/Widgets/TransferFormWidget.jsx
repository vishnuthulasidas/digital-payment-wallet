import {useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { walletService,transferService } from '../../api'

const TransferFormWidget = () => {
  const [searchParams] = useSearchParams()
  const [fromWalletId, setFromWalletId] = useState(searchParams.get('from') || '')
  const [toWalletId, setToWalletId] = useState(searchParams.get('to') || '')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const [alert, setAlert] = useState('')

  const { data, isLoading, refetch } = useQuery(
    {
      queryKey: ['wallets'],
      queryFn: walletService.getWallets
    }
  )

  if (isLoading) return <div>Loading...</div>;
  
  let selectables = data.map(wallet => ({id: wallet._id, name: wallet.name}));
  selectables.push({id: 'bank', name: 'Bank'})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAlert('')
    if (!fromWalletId || !toWalletId || !amount) {
      setAlert('Please fill all the fields')
      return
    }
    if (fromWalletId =="bank" || toWalletId =="bank") {
      setAlert('Bank transfer is not available yet')
      return
    }
    const transferData = {
      fromWalletId,
      toWalletId,
      amount,
    }
    try{
      const response= await transferService.selfTransfer(transferData)
      setAlert(response.msg)
      refetch()
    }
    catch(err){
      setAlert(err.response.data.msg)
    }
  }

  return (
    <div className='bg-white p-4 pb-6 border border-gray-400 rounded-lg flex flex-col gap-10 shadow-lg md:col-start-2 md:row-start-1 md:row-span-3 md:col-span-2'>
      <div>
      <h3 className='font-semibold text-xl'>Transfer Form</h3>
        <p className='text-sm text-gray-400'>You can now transfer money from wallet to wallet or to your bank accounts</p>
      </div>
      <form className='md:w-[60%]' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          {alert && <div className='bg-green-100 text-green-800 p-2 rounded-lg'>{alert}</div>}
          <div>
            <label htmlFor="from" className='text-sm'>From</label>
            <select name="from" id="from" className='w-full p-2 border border-gray-400 rounded-lg'
            onChange={(e) => setFromWalletId(e.target.value)}
            value={fromWalletId}
            >
              <option value="" disabled>Select Sender</option>
              {selectables.filter(wallet => wallet.id !== toWalletId).map(wallet => (
                <option value={wallet.id}>{wallet.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to" className='text-sm'>To</label>
            
            <select name="to" id="to" className='w-full p-2 border border-gray-400 rounded-lg'
            onChange={(e) => setToWalletId(e.target.value)}
            value={toWalletId}
            >
              <option value="" disabled>Select Reciever</option>
            {selectables.filter(wallet => wallet.id !== fromWalletId).map(wallet => (
                <option value={wallet.id}>{wallet.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount" className='text-sm'>Amount</label>
            <input type="number" name="amount" id="amount" className='w-full p-2 border border-gray-400 rounded-lg' 
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            />
          </div>
          <div>
            <label htmlFor="note" className='text-sm '>Note (currently unavailable)</label>
            <textarea name="note" id="note" className='w-full p-2 border border-gray-400 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-300'
            onChange={(e) => setNote(e.target.value)}
            value={note} 
            disabled
            ></textarea>
          </div>
          <div>
            <button className='bg-myBlue text-white py-3 rounded-lg w-full'>Transfer</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TransferFormWidget
