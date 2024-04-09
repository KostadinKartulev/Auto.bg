const {Schema,model}=require('mongoose');

const orderSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,minlength:8},
    phoneNumber:{type:String,required:true},
    delivery:{type:String,required:true},
    address:{type:String,required:true},
    postalCode:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    products:{type:[],required:true},
})

const Order=model('Order',orderSchema);

module.exports=Order;