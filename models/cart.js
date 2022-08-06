const mongoose=require('mongoose');
const cartSchema=new mongoose.Schema({

  
    Cart_Items:[
        {
            ProductId:{
                type: mongoose.Schema.Types.ObjectId,ref:'Product'
            },
        Quantity:{
            type:Number,default:1
        },
        
    }
    ],
    
},{ timestamps: true })

module.exports=mongoose.model('cart',cartSchema)
  