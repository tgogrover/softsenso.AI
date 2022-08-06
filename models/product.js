const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

//defining the schema
var ProductSchema=new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },
    rating:{     
      rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    },
    image:{
        type:String,
        required:true

    }
   
  
   

    
},{ timestamps: true });


//exporting Product model
module.exports=mongoose.model('Product',ProductSchema)