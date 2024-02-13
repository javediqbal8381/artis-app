const Shop = require('../models/shopsModel');
const Product = require('../models/productsModel');

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching all shops:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
  const { id } = req.params;
  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).json({ message: 'Shop created successfully', shop: newShop });
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing shop
exports.updateShop = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedShop = await Shop.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json({ message: 'Shop updated successfully', shop: updatedShop });
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShop = await Shop.findByIdAndDelete(id);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add products to a shop
exports.addProductsToShop = async (req, res) => {
  const { shopId } = req.params;
  const { products } = req.body;
  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    const addedProducts = await Product.insertMany(products);
    shop.products.push(...addedProducts.map(product => product._id));
    await shop.save();
    res.json({ message: 'Products added to shop successfully', shop });
  } catch (error) {
    console.error('Error adding products to shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove products from a shop
exports.removeProductsFromShop = async (req, res) => {
  const { shopId } = req.params;
  const { productIds } = req.body;
  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    shop.products = shop.products.filter(productId => !productIds.includes(productId));
    await shop.save();
    res.json({ message: 'Products removed from shop successfully', shop });
  } catch (error) {
    console.error('Error removing products from shop:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllProductsOfShop = async (req, res) => {
  const { shopId } = req.params;
  try {
      const shop = await Shop.findById(shopId).populate('products');
      if (!shop) {
          return res.status(404).json({ message: "Shop not found" });
      }

      res.status(200).json(shop);
  } catch (error) {
      console.error("Error fetching products of shop:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
