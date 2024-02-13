const Product = require('../models/productsModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products)
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get product detail by id
exports.getProductDetail = async (req, res) => {
    const productId = req.params.id
    try {
        const products = await Product.findById(productId);
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProductsByIds = async (req, res) => {
    const { productIds } = req.body;

    try {
        const products = await Product.find({ _id: { $in: productIds } });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by IDs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get products by shop
exports.getProductsByShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const products = await Product.find({ shopId });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by shop:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get products by top ratings
exports.getProductsByTopRatings = async (req, res) => {
    try {
        const products = await Product.find().sort({ rating: -1 }).limit(10);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by top ratings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get products by price range
exports.getProductsByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products by price range:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// bulk actions -----------------------------------------------

// Create multiple products in bulk
exports.bulkCreateProducts = async (req, res) => {
    try {
        const products = req.body; // Assuming req.body is an array of product objects

        // Validate data (optional)
        // Insert products into the database
        const insertedProducts = await Product.insertMany(products);

        res.status(201).json({ message: 'Products created successfully', products: insertedProducts });
    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

