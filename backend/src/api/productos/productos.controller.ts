import type { Request, Response, NextFunction } from 'express';
import { fetchAllProducts } from './productos.service';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await fetchAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};