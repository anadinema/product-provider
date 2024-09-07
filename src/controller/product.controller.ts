import express from 'express';
import { createProduct, getAllProducts, getProductById, getProductFromBody, updateProduct } from '../repository/product.repository';

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const product = getProductFromBody(req.body);

    if (!product || !product.type || !product.name || !product.createdBy) {
      return res.status(400).send({
        message: 'Either name, type or createdBy is missing in the request!'
      });
    }

    const result = await createProduct(product);
    return res.status(202).json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const fetchAll = async (req: express.Request, res: express.Response) => {
  try {
    const result = await getAllProducts();

    if (!result || result.length < 1) {
      return res.sendStatus(204);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const fetchById = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    const result = await getProductById(id);

    if (!result) {
      return res.sendStatus(204);
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

export const update = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    const current = await getProductById(id);

    if (!current) {
      return res.sendStatus(404);
    }

    const updates = getProductFromBody(req.body);

    if (!updates) {
      return res.status(400).json({
        message: 'No updates found in the request!'
      });
    }

    if (!updates.updatedBy) {
      return res.status(400).json({
        message: 'No data for field updatedBy found in the request!'
      });
    }

    const result = await updateProduct(id, updates);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};