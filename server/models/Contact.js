import mongoose from 'mongoose';export default mongoose.model('Contact',new mongoose.Schema({email:String,message:String,status:{type:String,default:'new'},createdAt:{type:Date,default:Date.now}}));
