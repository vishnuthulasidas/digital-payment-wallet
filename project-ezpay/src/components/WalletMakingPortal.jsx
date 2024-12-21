import React, { useState } from "react";
import { createPortal } from "react-dom";
  ;
     
import { toast } from "react-toastify";

const WalletMakingPortal = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient();
    const [walletName, setWalletName] = useState("");
    const [useAnotherWallet, setUseAnotherWallet] = useState(false);
    const [sourceWallet, setSourceWallet] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const { data, isLoading } = useQuery(
        {
            queryKey: ['wallets'],
            queryFn: walletService.getWallets
        }
    );

    if (!isOpen) return null;

    if (isLoading) return <div>Loading...</div>;


    const selectables = data.map(wallet => ({ id: wallet._id, name: wallet.name }));
    const handleSubmit = async () => {
        try {
            let newWallet;
            if (useAnotherWallet) {
                // Create a new wallet
                newWallet = await walletService.createWallet({ name: walletName });
                // Transfer money from source wallet to new wallet
                const transferData = {
                    fromWalletId: sourceWallet,
                    toWalletId: newWallet._id,
                    amount,
                };
                await transferService.selfTransfer(transferData);
                toast(`✅ Wallet created and Funds are Transferred successfully`);
            } else {
                // Create a new wallet
                newWallet = await walletService.createWallet({ name: walletName });
                toast(`✅ Wallet created successfully`);
            }
            queryClient.invalidateQueries(['wallets']);

            //clear the form
            setWalletName("");
            setUseAnotherWallet(false);
            setSourceWallet("");
            setAmount("");

            onClose();
        } catch (error) {
            console.error("Error creating wallet or transferring money:", error);
            setError(error.response.data.msg);
        }
    };

    return createPortal(
        <div className="fixed top-0 left-0 font-aleo w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6">Create a New Wallet</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg">Wallet Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded text-lg"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="inline-flex items-center text-lg">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            checked={useAnotherWallet}
                            onChange={(e) => setUseAnotherWallet(e.target.checked)}
                        />
                        <span className="ml-2 text-gray-700">Add money from another wallet</span>
                    </label>
                </div>
                {useAnotherWallet && (
                    <>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg">Source Wallet</label>
                            <select
                                className="w-full p-3 border border-gray-300 rounded text-lg"
                                value={sourceWallet}
                                onChange={(e) => setSourceWallet(e.target.value)}
                            >
                                <option value="">Select a wallet</option>
                                {selectables.map(wallet => (
                                    <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg">Amount</label>
                            <input
                                type="number"
                                className="w-full p-3 border border-gray-300 rounded text-lg"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="flex justify-end space-x-4 mt-6 font-bold">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 bg-gray-200 rounded hover:bg-red-600 hover:text-white border border-black text-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-3 bg-black border border-black text-white rounded hover:bg-green-600 hover:text-black text-lg"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default WalletMakingPortal;
