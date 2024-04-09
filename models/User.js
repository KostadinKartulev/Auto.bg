const {Schema,model,Types:{ObjectId}}=require('mongoose');
const { comparePassword, hashPassword } = require('../services/util');

const userSchema=new Schema({
    email:{type:String,required:true,minlength:8},
    username:{type:String,required:true,minlength:3},
    hashedPassword:{type:String,required:true},
    isEmployee:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    //To make serviceRequests={type:[ObjectId] default;[] ref:serviceRequest} in order to show the user the requests he made,the accepted and declined requests from the employee
    serviceRequests:{type:[ObjectId],default:[],ref:'ServiceRequest'}
});

userSchema.methods.comparePassword=async function(password) {
    return await comparePassword(password,this.hashedPassword);
}

userSchema.pre('save',async function(next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword=await hashPassword(this.hashedPassword)
    }

    next();
})

const User=model('User',userSchema);

module.exports=User;