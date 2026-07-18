import mongoose from 'mongoose';
const InquirySchema=new mongoose.Schema({name:String,email:String,subject:String,message:String},{timestamps:true});
export default mongoose.model('Inquiry',InquirySchema);
