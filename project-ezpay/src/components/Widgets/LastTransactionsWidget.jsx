import React from 'react'
import SingleTransactionInfo from '../SingleTransactionInfo'
import { transactionService } from '../../api'
import { useQuery } from '@tanstack/react-query'
import formatDate from '../../utils/dateFormater'

const LastTransactionsWidget = () => {
  const { data, error, isLoading } = useQuery({
      queryKey: ['transactions'],   // The query key as an array
      queryFn: transactionService.getAllTransactions, // The function to fetch the data
    });

  if (isLoading) return <div>Loading...</div>
  return (
    <div className='bg-white border border-gray-400 p-4 shadow-lg rounded-lg md:col-start-3 md:row-start-2 md:row-span-3'>
      <div className='font-bold text-lg'>Last Transactions</div>
      <div className='p-3 flex flex-col gap-3 mt-1'>
       {data.slice(0, 6).map(transaction => (
         <SingleTransactionInfo
          key={transaction._id} 
          name={transaction.transactionType=="self transfer"?"Wallet Transfers":(transaction.type=="send"?transaction.receiverId.name:transaction.senderId.name)} 
          date={formatDate(transaction.createdAt)} 
          amount={transaction.amount} 
          type={transaction.transactionType=="self transfer"?"self":(transaction.type=="send"?"debit":"credit")} />
       ))}

      </div>
    </div>
  )
}

export default LastTransactionsWidget
