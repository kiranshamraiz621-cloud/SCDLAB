import mongoose from 'mongoose';export default mongoose.model('QuizScore',new mongoose.Schema({userId:String,name:String,score:Number,total:Number,createdAt:{type:Date,default:Date.now}}));
