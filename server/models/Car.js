import mongoose from 'mongoose';
const CarSchema=new mongoose.Schema({name:String,brand:String,price:Number,horsepower:Number,topSpeed:Number,image:String,specs:Object},{timestamps:true});
export default mongoose.model('Car',CarSchema);
