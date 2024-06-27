const express = require("express");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const {authMiddleware} = require("./middleware")

module.exports = router;

router.get("/balances", authMiddleware, async (req, res)=>{
    const found = await Account.findOne({
        userId: req.userId
    });

    if (!found) {
        res.json({
            message: "User doesn't exist"
        })
    } else {
        res.json({
            balance: found.balance
        })
    }


})

router.post("/transfer", authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const amount = req.body.amount;
    const to = req.body.to;

    const Sender = await Account.findOne({
        userId: req.userId
    }).session(session);

    


    if (!Sender || Sender.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const receiver = await Account.findOne({
        userId: to
    }).session(session);


    if (!receiver) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Account doesn't exist/invalid Account"
        })
    }

    

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {balance: -amount}
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {balance: amount}
    }).session(session);

    //commit transaction

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })

    
})