import { Product } from '../models/index.js';

export const getProducts = async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = {
                $or: [
                    { title: searchRegex },
                    { category: searchRegex },
                    { era: searchRegex }
                ]
            };
        }

        const products = await Product.find(query);

        // Transform _id to id for frontend compatibility
        const formattedProducts = products.map(p => {
            const productObj = p.toObject();
            productObj.id = productObj._id.toString();
            return productObj;
        });

        res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, stack: error.stack, name: error.name });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            const productObj = product.toObject();
            productObj.id = productObj._id.toString();
            res.json(productObj);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
