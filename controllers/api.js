const productModel=require('../models/product');
const axios = require('axios');
const circularJSON = require('circular-json');
const cartModel=require('../models/cart');

exports.getFakeApi_AndSaveInDb = async(req,res)=>{
   try {
   // let json = circularJSON.stringify(req);
    var products = await axios.get("https://fakestoreapi.com/products");
    if(products){
      
     const product =   circularJSON.stringify(products)
    const parse = JSON.parse(product)
    //console.log(ok)
var productData= parse.data;

    const Products = await productModel.insertMany(productData);
    if(Products){
        return  await res.status(200).json({
            status: "200",
            message: "Success",
            success: true,
            data: {Products}
        })

    }
    

        
    }

    
    
   } catch (error) {
   console.log(error)
    return res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        success: false,
        data: { error }
    })
    
   }
        
    }





    exports.productsEjs=async(req,res)=>{
        try {
            const products = await productModel.find({}).exec();
             //   console.log(medicine)
                if(products === []){
              return   res.render('product',{Message:'', Error:'No Product Available',message:''})
                }
             return res.render('product',{Message: products , Error:'',message:''})
           
           
            
        } catch (error) {
            return   res.render('product',{Message:'', Error:'Something went wrong,Please try again later',message:''})
            
        }
            
        }


    exports.addProducttoCarts=async(req,res)=>{
            try {
                const {id}=req.params;
                const Product= await productModel.find({}).exec();
                 
                    if(Product===[]){
            return  res.render('product',{Message:'', Error:'No product Available',message:''})
                    }
                    else{
                        const Cart = await cartModel.find({}).exec();
                        //console.log(Cart)
                        if(Cart.length != 0){
                            const {Cart_Items,_id}=Cart[0];
                            const idCheck = Cart_Items.filter((element)=>{
                                return element.ProductId == id

                            })
                         //   console.log(idCheck)
                           if(idCheck.length != 0){
                            const quantityUpdate = Cart_Items.map((element)=>{
                                if(element.ProductId == id){
                                element.Quantity += 1 
                                }
                                return element

                            })
                         //   console.log(quantityUpdate)
                          const update=  await cartModel.findOneAndUpdate({_id},{Cart_Items:quantityUpdate})
                           if(update){
                            return res.render('product',{Message:Product, Error:'',message:'product added succesfully to cart'})
                           }
                           }
                           const cartItems={
                            ProductId:id,
                            Quantity:1

                           }
                           const  addAnotherItem=  await  cartModel.findOneAndUpdate(
                            {_id},
                            { $push: {Cart_Items : cartItems}},{new : true}).exec();
                            console.log(addAnotherItem)
                     if(addAnotherItem){
                        return res.render('product',{Message:Product, Error:'',message:'product added succesfully to cart'})
                     }

                        }
                        const CartData=new cartModel({
                       
                            Cart_Items:{
                             ProductId:id,
                                Quantity:1
                            }
                        })
                        await CartData.save();
       return res.render('product',{Message:Product, Error:'',message:'product added succesfully to cart'})             
                
            } 
        }catch (error) {
                console.log(error)
                return res.render('product',{message:'',Error:'Something Went Wrong,Product cannot added to cart',Message:Product})
            }
                
            }


            exports.cart=async(req,res)=>{
              const items=  await cartModel.find({}).exec();
              if(items.length == 0){
                return  res.render('cart',{Message:'', Error:'No product Available',message:''})

              }
              const {Cart_Items}=items[0]
              return  res.render('cart',{Message:Cart_Items, Error:'',message:''})

            }
    




