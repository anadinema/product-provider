import express from 'express';
import { create, fetchAll, fetchById, update } from '../controller/product.controller';
import { cache } from '../middleware/cache';

export default (router: express.Router) => {
  router.get('/api/product', cache, fetchAll);
  router.get('/api/product/:id', cache, fetchById);
  router.post('/api/product', create);
  router.put('/api/product/:id', update);
}