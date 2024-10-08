const httpStatus = require('http-status');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const messages = require('../constants/messages');

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: messages.CATEGORY.CREATED,
    data: category,
  });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
exports.getCategories = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  
  let categoriesQuery = Category.find();
  
  if (page && limit) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const startIndex = (pageNumber - 1) * limitNumber;
    
    categoriesQuery = categoriesQuery.skip(startIndex).limit(limitNumber);
  }

  const categories = await categoriesQuery;
  const total = await Category.countDocuments();

  res.status(200).json({
    success: true,
    count: categories.length,
    pagination: page && limit ? {
      current: parseInt(page, 10),
      total: Math.ceil(total / limit),
    } : null,
    data: categories,
  });
});


// @desc    Update category
// @route   PATCH /api/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: messages.CATEGORY.NOT_FOUND,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: messages.CATEGORY.UPDATED,
    data: category,
  });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: messages.CATEGORY.NOT_FOUND,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: messages.CATEGORY.DELETED,
    data: {},
  });
});
