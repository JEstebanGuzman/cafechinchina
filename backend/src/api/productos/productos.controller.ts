import express from 'express';
import { fetchAllProducts } from './productos.service';

export const getAllProducts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const products = await fetchAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};
