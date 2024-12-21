import React from 'react'
import WalletWidget from '../components/Widgets/WalletWidget'
import TransferFormWidget from '../components/Widgets/TransferFormWidget'

const TransferPage = () => {
  return (
    <div className='px-3 py-5 md:w-[98%] md:m-auto grid md:grid-col-3 gap-5'>
      <WalletWidget/>
      <TransferFormWidget/>
    </div>
  )
}

export default TransferPage
