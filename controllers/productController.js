import Product from '../models/Product.js';

// Create a new product (Admin only)
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, stock, images } = req.body;

        // Validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name, description, price, and category are required'
            });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            brand,
            stock: stock || 0,
            images: images || [],
            createdBy: req.user._id
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating product'
        });
    }
};

// Update a product (Admin only)
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating product'
        });
    }
};

// Delete a product (Admin only)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting product'
        });
    }
};

// Get single product details
export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate('createdBy', 'username email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product details error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching product details'
        });
    }
};

// List products with pagination, search, and filters
export const listProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            category = '',
            minPrice = 0,
            maxPrice = Number.MAX_VALUE,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            inStock = ''
        } = req.query;

        // Build query
        const query = { isActive: true };

        // Search by name, description, or category
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by category
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }

        // Filter by price range
        query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };

        // Filter by stock availability
        if (inStock === 'true') {
            query.stock = { $gt: 0 };
        } else if (inStock === 'false') {
            query.stock = 0;
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        // Execute query
        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .populate('createdBy', 'username');

        // Get total count
        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalProducts: total,
                productsPerPage: Number(limit),
                hasNextPage: skip + products.length < total,
                hasPrevPage: Number(page) > 1
            }
        });
    } catch (error) {
        console.error('List products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching products'
        });
    }
};

// Get all unique categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching categories'
        });
    }
};
