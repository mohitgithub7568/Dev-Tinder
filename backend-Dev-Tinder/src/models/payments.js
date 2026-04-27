const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    receipt:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    notes:{
        firstName:{
            type:String,
            required:false,
        },
        lastName:{
            type:String,
            required:false,
        },
        membershipType:{
            type:String,
            required:true,
        }
    }


},{    timestamps:true,
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;