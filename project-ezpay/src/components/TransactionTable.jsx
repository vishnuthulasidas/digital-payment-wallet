import React, { useState,useEffect } from 'react';
   
    

const TransactionTable = ({data}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;

    // Calculate pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(data.length / rowsPerPage);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);
    // Handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);

    };

    return (
        <div className="table-container mt-10 md:w-[80%] m-auto">
            {/* Table for larger screens */}
            <table className="w-full border-collapse hidden sm:table">
    <thead>
        <tr className="bg-gray-200">
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Transaction Type</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Recipient/Sender</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Amount</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Wallet</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Date and Time</th>
            <th className="border border-gray-400 p-3 text-left text-sm font-semibold text-gray-700">Notes/Description</th>
        </tr>
    </thead>
    <tbody>
        {currentRows.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 even:bg-gray-100">
                {/* Transaction ID */}
                <td className="border border-gray-400 p-3 text-sm text-gray-700">{transaction.id}</td>

                {/* Transaction Type with color coding */}
                <td 
                    className={`border border-gray-400 p-3 text-sm font-bold ${
                        transaction.type=="Wallet Transfers"?"text-primary":(transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600')
                    }`}
                >
                    {transaction.type}
                </td>

                {/* Recipient/Sender */}
                <td className="border border-gray-400 p-3 text-sm text-gray-700">{transaction.recipient}</td>

                {/* Amount with color coding */}
                <td 
                    className={`border border-gray-400 p-3 text-sm font-bold ${
                        transaction.type=="Wallet Transfers"?"text-primary":(transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600')
                    }`}
                >
                    &#8377; {transaction.amount}
                </td>

                {/* Wallet */}
                <td className="border border-gray-400 p-3 text-sm text-indigo-600">{transaction.wallet}</td>

                {/* Date and Time */}
                <td className="border border-gray-400 p-3 text-sm text-gray-500">{transaction.date}</td>

                {/* Notes/Description */}
                <td className="border border-gray-400 p-3 text-sm text-gray-700">{transaction.notes}</td>
            </tr>
        ))}
    </tbody>
</table>


            {/* Card view for mobile screens */}
            <div className="sm:hidden">
    {currentRows.map((transaction) => (
        <div 
            key={transaction.id} 
            className="border border-gray-300 rounded-lg p-3 mb-3 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
        >
            {/* Transaction ID and Date (compact, smaller text) */}
            <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>ID: {transaction.id}</span>
                <span>{transaction.date}</span>
            </div>

            {/* Recipient/Sender (large, bold) */}
            <p className="text-lg font-bold text-gray-800 mb-1">{transaction.recipient}</p>

            {/* Amount (large, color-coded) */}
            <p 
                className={`text-xl font-bold mb-1 ${
                    transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                }`}
            >
                &#8377; {transaction.amount}
            </p>

            {/* Wallet (smaller text, highlighted) */}
            <p className="text-sm font-medium text-indigo-600">{transaction.wallet}</p>
        </div>
    ))}
</div>


            {/* Pagination controls */}
            <div className="flex justify-between items-center mt-4 m-auto md:w-[30%]">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-400'}`}
                >
                    {`<<<`}
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-400'}`}
                >
                    {`>>>`}
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;
