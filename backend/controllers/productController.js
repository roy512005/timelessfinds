import { Op } from 'sequelize';
import { Product } from '../models/index.js';

export const getProducts = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                [Op.or]: [
                    { title: { [Op.like]: `%${req.query.search}%` } },
                    { category: { [Op.like]: `%${req.query.search}%` } },
                    { era: { [Op.like]: `%${req.query.search}%` } }
                ]
            }
            : {};

        const products = await Product.findAll({ where: keyword });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
