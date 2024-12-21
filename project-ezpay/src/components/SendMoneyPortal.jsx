// src/components/MoneyPortal.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {toast} from 'react-toastify';

    
import { useQueryClient } from '@tanstack/react-query';

const MoneyPortal = ({ isOpen, onClose, reciever="" }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(reciever);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

    const endsWith = (str, suffix) => {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

  const handleSend = async (e) => {
    e.preventDefault();
    let user_name=recipient
    if(!endsWith(user_name,'@ezpay')){
      user_name+='@ezpay'
    }

    const transactionData = {
      amount,
      receiverUsername: user_name,
    };

    try {
      const response = await transactionService.sendMoney(transactionData);
      if(response){

        toast("💵 Money sent successfully");
  
        // inavlidate the query to refetch the data
        queryClient.invalidateQueries(['wallets']);
  
        setAmount('');
        setRecipient('');
        setError('');
  
          onClose();
      }
    }
    catch (err) {
        setError(err.response.data.msg);
    }

  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 font-aleo w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Payment Portal</h2>
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            {error && <div className="text-red-500">{error}</div>}
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Recipient</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4 font-bold">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-red-600 hover:text-white border border-black"
              onClick={()=>{
                setAmount('')
                setRecipient('')
                setError('')
                onClose()
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black border border-black text-white rounded hover:bg-green-600 hover:text-black"
            >
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // Attach the portal to the body
  );
};

export default MoneyPortal;
