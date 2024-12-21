import React from 'react'
import TransactionTable from '../components/TransactionTable'
import { useQuery } from '@tanstack/react-query'
import {transactionService} from '../api'
import formatDate from '../utils/dateFormater'
const HistoryPage = () => {
    const { data, error, isLoading } = useQuery({
          queryKey: ['transactions'],   // The query key as an array
          queryFn: transactionService.getAllTransactions, // The function to fetch the data
        });

    if (isLoading) return <div>Loading...</div>
    // filter data like this Transaction ID	Transaction Type	Recipient/Sender	Amount	Wallet	Date and Time	Notes/Description
    const filteredData = data.map(transaction => ({
        id: transaction._id,
        type: transaction.transactionType=="self transfer"?"Wallet Transfers":(transaction.type=="send"?"Debit":"Credit"),
        recipient: transaction.transactionType=="self transfer"?"Wallet Transfers":(transaction.type=="send"?transaction.receiverId.name:transaction.senderId.name),
        amount: transaction.amount,
        date: formatDate(transaction.createdAt),
        notes: transaction.notes?? "No notes",
        wallet: 'Primary'
    }))
    
return (
    <div className='md:p-5 md:w-[98%] md:m-auto px-3'>
        <div className="bg-white border border-gray-400 p-4 shadow-lg rounded-lg">
            <div className='font-semibold text-xl md:text-center'>Transactional History</div>
        {filteredData && <TransactionTable data={filteredData} />}
        </div>
    </div>
)
}

export default HistoryPage
