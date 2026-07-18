import Car from '../models/Car.js';import Favorite from '../models/Favorite.js';import Inquiry from '../models/Inquiry.js';
export const cars={list:async(req,res)=>res.json(await Car.find().sort('brand name').limit(100)),create:async(req,res)=>res.status(201).json(await Car.create(req.body)),detail:async(req,res)=>res.json(await Car.findById(req.params.id))};
export const favorites={list:async(req,res)=>res.json(await Favorite.find({userId:req.params.userId}).sort('-createdAt')),create:async(req,res)=>res.status(201).json(await Favorite.create(req.body)),remove:async(req,res)=>res.json(await Favorite.findByIdAndDelete(req.params.id))};
export const contact=async(req,res)=>res.status(201).json(await Inquiry.create(req.body));
export const stats=(_,res)=>res.json({cars:'50+',brands:10,images:'1000+',theme:'luxury-dark'});
