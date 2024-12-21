const Wallet=require('../models/Wallet');
const Transaction=require('../models/Transaction');


// transfer money from one wallet to another
exports.selfTransfer=async(req,res)=>{
    const {fromWalletId,toWalletId}=req.body;

    let {amount}=req.body; //since it need to be converted to float
    amount=parseFloat(amount);
    try {
        const fromWallet = await Wallet.findOne({ _id: fromWalletId, userId: req.user.id });
        if(!fromWallet){
            return res.status(404).json({msg:'From wallet not found'});
        }
        const toWallet=await Wallet.findById({ _id: toWalletId, userId: req.user.id });
        if(!toWallet){
            return res.status(404).json({msg:'To wallet not found'});
        }
        if(fromWallet.balance<amount){
            return res.status(400).json({msg:'Insufficient balance'});
        }
        
        if (fromWalletId === toWalletId) {
            return res.status(400).json({ msg: 'Cannot transfer to the same wallet.' });
          }

        // deduct amount from fromWallet
        fromWallet.balance-=amount;
        await fromWallet.save();
        // add amount to toWallet
        toWallet.balance+=amount;
        await toWallet.save();
        // create transaction
        const transaction=new Transaction({
            senderId: req.user.id,
            receiverId: req.user.id,
            senderWalletId:fromWalletId,
            receiverWalletId:toWalletId,
            amount,
            transactionType: 'self transfer',
            status:'completed'
        });

        await transaction.save();
        res.json({msg:'Transfer successfull'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:'Server error'});
    }
};