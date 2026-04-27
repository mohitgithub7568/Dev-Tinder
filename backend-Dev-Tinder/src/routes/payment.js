const express = require('express');
const { UserAuth } = require('../middleware/auth');
const paymentRouter = express.Router();
const razorpayInstance = require('../helpers/razorpay');
const { isFirstDayOfMonth } = require('date-fns/isFirstDayOfMonth');
const paymentModel = require('../models/payments');
const { memberShipAmounts } = require('../helpers/constant');


paymentRouter.post('/payment/create',UserAuth,   async (req, res) => {
    try {
        const { membershipType } = req.body;

        // Validate membership type
        const validMembershipTypes = Object.keys(memberShipAmounts);
        if (!validMembershipTypes.includes(membershipType)) {
            return res.status(400).json({ message: "Invalid membership type" });
        }
        const {firstName, lastName,email} = req.user; 

       const order = await razorpayInstance.orders.create({
            amount: memberShipAmounts[membershipType], // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                firstName:firstName,
                lastName:lastName,
                email:email,
                membershipType:membershipType,
            },

        });
        //saving in database
        const paymentRecord = new paymentModel({
            userId: req.user._id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: "created",
            notes:{
                firstName:req.user.firstName,
                lastName:req.user.lastName,
                membershipType:membershipType,
            }
        });
        const savedPaymentRecord = await paymentRecord.save();
        //responding with the order details
        res.json({...savedPaymentRecord.toJSON(),razorpaykeyId: process.env.RAZORPAY_KEY_ID});

    }

    catch (err) {
        res.status(500).send(err.message);
    }

});

module.exports = paymentRouter;