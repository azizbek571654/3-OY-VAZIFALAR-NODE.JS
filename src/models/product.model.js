import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true
    },
    description:{
        type:String, 
        trim:true,
    },
    price:{
        type:Number,
        require:true,
        min:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        require:true
    },
    stock:{
        type:Number,
        min:0
    },
},
{
    timestamps:true
}
)

export const Product = mongoose.model("product", productSchema)