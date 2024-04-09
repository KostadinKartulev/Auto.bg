const {Schema,model}=require('mongoose');

const serviceRequestSchema=new Schema({
    carModel:{type:String,required:true},
    carYear:{type:Number,required:true},
    serviceType:{type:String,required:true},
    clientPhoneNumber:{type:String,required:true},
    dateToBringCar:{type:String},//make it date type to test if works
    isFinished:{type:Boolean,default:false},
    isProcessed:{type:Boolean,default:false},
    isAccepted:{type:Boolean,default:false},

})

const ServiceRequest=model('ServiceRequest',serviceRequestSchema);

module.exports=ServiceRequest;