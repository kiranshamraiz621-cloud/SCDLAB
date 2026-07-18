import {Router} from 'express';import {cars,contact,favorites,stats} from '../controllers/controllers.js';
const r=Router();r.get('/cars',cars.list);r.post('/cars',cars.create);r.get('/cars/:id',cars.detail);r.get('/favorites/:userId',favorites.list);r.post('/favorites',favorites.create);r.delete('/favorites/:id',favorites.remove);r.post('/contact',contact);r.get('/stats',stats);export default r;
