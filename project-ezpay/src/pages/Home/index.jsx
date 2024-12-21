import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import LandingNavbar from '../../components/NavBar/LandingNavbar'
import Hero from '../../components/Hero'
import SymbolCard from '../../components/Card/SymbolCard'
import ColorCard from '../../components/Card/ColorCard'
import LandingFooter from '../../components/Footer/LandingFooter'

const index = () => {
  useEffect(() => {
    AOS.init({
      once: true
    })
  }, [])

  return (
    <>
      <LandingNavbar />
    <div className='font-aleo px-24 py-5 max-w-[1500px] flex flex-col m-auto'>
      <Hero />
      <div id="why-us" className='self-center text-4xl font-semibold mt-16'>Why choose EzPay?</div>
      <div className='mt-20 grid grid-cols-2 gap-16'
      data-aos="fade-up"
      >
        <SymbolCard
          type="diamond"
          title="Effortless Transactions"
          content="Send, receive, and manage funds in just a few taps, with an intuitive interface that makes every step smooth and hassle-free." />

        <SymbolCard
          type="lock"
          title="Secure Payments"
          content="Our top-notch security features ensure that your transactions are safe and secure, every time." />

        <SymbolCard
          type="telescope"
          title="Real-time Monitoring"
          content="Stay in control of your finances with real-time updates on your transactions, so you always know where your money is going." />
      
      </div>

      <div id="help" className='self-center text-4xl font-semibold mt-32'>Frequently asked question</div>
      <div className='grid grid-cols-2 gap-x-28 gap-y-10 w-[70%] m-auto mt-10'>
        <ColorCard aos_type="fade-right" color_num="1" title="Is EzPay secure for transactions?" content="Absolutely! EzPay uses advanced encryption, biometric authentication, and fraud detection to keep your money safe." />
        <ColorCard aos_type="fade-left" color_num="2" title="How fast are transactions with EzPay?" content="With EzPay, transactions are processed instantly, so you can send and receive funds in a matter of seconds." />
        <ColorCard aos_type="fade-right" color_num="3" title="Can I track my transactions with EzPay?" content="Yes, you can monitor your transactions in real-time with EzPay, so you always know where your money is going." />
        <ColorCard aos_type="fade-left" color_num="4" title="Is EzPay available on all devices?" content="EzPay is accessible on all devices, including smartphones, tablets, and computers, so you can manage your finances on the go." />
      </div>
    </div>
      <LandingFooter/>
    </>
  )
}

export default index  
