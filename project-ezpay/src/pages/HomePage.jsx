import React from 'react'
import Header from '../components/Header'
import WalletWidget from '../components/Widgets/WalletWidget'
import QuickSendWidget from '../components/Widgets/QuickSendWidget'
import BusinessWidget from '../components/Widgets/BusinessWidget'
import PeopleWidget from '../components/Widgets/PeopleWidget'
import ServicesWidget from '../components/Widgets/ServicesWidget'
import LastTransactionsWidget from '../components/Widgets/LastTransactionsWidget'

const HomePage = () => {
  return (
      <div className='grid gap-3 px-3 md:grid-cols-3 md:p-5 md:w-[98%] md:m-auto'> 
        <QuickSendWidget/>
        <WalletWidget/>
        <BusinessWidget/>
        <PeopleWidget/>
        <ServicesWidget/>
        <LastTransactionsWidget/>
      </div>
  )
}

export default HomePage
