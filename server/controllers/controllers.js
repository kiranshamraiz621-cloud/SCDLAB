import jwt from 'jsonwebtoken';import User from '../models/User.js';import Favorite from '../models/Favorite.js';import QuizScore from '../models/QuizScore.js';import Contact from '../models/Contact.js';
export const auth=async(req,res)=>{const user=await User.findOneAndUpdate({email:req.body.email},req.body,{upsert:true,new:true});const token=jwt.sign({sub:user.id,email:user.email,role:user.role},process.env.JWT_SECRET||'dev-secret',{expiresIn:'7d'});res.json({user,token})};
export const favorites={list:async(req,res)=>res.json(await Favorite.find({userId:req.params.userId}).sort('-createdAt')),create:async(req,res)=>res.status(201).json(await Favorite.create(req.body)),remove:async(req,res)=>res.json(await Favorite.findByIdAndDelete(req.params.id))};
export const quiz={submit:async(req,res)=>res.status(201).json(await QuizScore.create(req.body)),leaderboard:async(_,res)=>res.json(await QuizScore.find().sort('-score createdAt').limit(25))};
export const contact=async(req,res)=>res.status(201).json(await Contact.create(req.body));
export const users=async(_,res)=>res.json(await User.find().sort('-createdAt').limit(100));
