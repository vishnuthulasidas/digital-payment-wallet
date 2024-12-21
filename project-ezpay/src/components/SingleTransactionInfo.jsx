import React from 'react'

const SingleTransactionInfo = ({name,date,amount,type}) => {
    const typeStyles={
        credit:{
          color:"text-green-600",
          sign:"+ ₹"
        },
        debit:{
          color:"text-red-600",
          sign:"- ₹"
        },
        self:{
          color:"text-primary",
          sign:"~ ₹"
        }
    }
    amount=typeStyles[type].sign+amount
  return (
    <div className='flex justify-between w-full items-center pb-3 border-b-2 border-gray-400'>
      <div className=''>
        <h4 className='text-lg font-semibold'>{name}</h4>
        <p className='text-gray-500 text-sm'>{date}</p>
      </div>
      <h4 className={`text-xl font-semibold ${typeStyles[type].color}`}>{amount}</h4>
    </div>
  )
}

export default SingleTransactionInfo
