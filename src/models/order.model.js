import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status:{
        enum:["proccessing", "shipped", "delivered" ],
    },
    total:{
        type:Number,
        min:0,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        require:true
    }
},
{
    timestamps:true
})

export const Order = mongoose.model("order", orderSchema)