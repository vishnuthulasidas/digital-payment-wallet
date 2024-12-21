import React, { useState } from 'react'
import PeopleWidget from '../components/Widgets/PeopleWidget'
import personIcon from '../assets/person-icon-black.svg'

const PeoplePage = () => {
  const [chatOpenUser, setChatOpenUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const handleUserSelect = (user) => {
    setChatOpenUser(user)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage])
      setNewMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className='px-3 py-5 md:w-[98%] md:m-auto flex flex-col md:flex-row gap-4'>
      <div className={`${chatOpenUser && "hidden"} md:block`}>
        <PeopleWidget userSelector={handleUserSelect} searchable={true} />
      </div>

      <div className={`${!chatOpenUser && "hidden"} ${chatOpenUser && "md:block"} flex-grow`}>
        <div className='bg-white border border-gray-400 p-4 shadow-lg rounded-lg flex flex-col h-[530px] max-w-[800px]'>
          <div className='flex gap-5 border-b-2 border-gray-300 p-5 items-center'>
            <img src="https://avatar.iran.liara.run/public/boy?name=vt" alt="" className='w-12 h-12' />
            <div>
              <h3 className='font-semibold text-xl'>{chatOpenUser}</h3>
              <p className='text-sm text-gray-500'>Last transaction on 14/08/2023</p>
            </div>
          </div>
          <div className='flex-grow overflow-y-auto p-4'>
            {/* chat window */}
            {messages.map((message, index) => (
              <div key={index} className='bg-blue-200 p-3 rounded-lg my-2 self-start max-w-xs'>
                {message}
              </div>
            ))}
          </div>
          <div className='p-4 border-t-2 border-gray-300 flex flex-col md:flex-row gap-3'>
            <input
              type="text"
              placeholder='Type your message...'
              className='flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className='bg-blue-500 text-white px-10 py-2 rounded-lg text-lg hover:bg-blue-600 transition duration-300'
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeoplePage
