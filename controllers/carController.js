const httpStatus = require('http-status');
const Car = require('../models/Car');
const asyncHandler = require('../utils/asyncHandler');
const messages = require('../constants/messages');

// @desc    Create new car
// @route   POST /api/cars
// @access  Private
exports.createCar = asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: messages.CAR.CREATED,
    data: car,
  });
});

// @desc    Get all cars
// @route   GET /api/cars
// @access  Private
exports.getCars = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  let cars = await Car.find().skip(startIndex).limit(limit).populate('categoryId').lean();
  const total = await Car.countDocuments();

  res.status(httpStatus.OK).json({
    success: true,
    count: cars.length,
    pagination: {
      current: page,
      total: Math.ceil(total / limit),
    },
    data: cars,
  });
});


// @desc    Get single car
// @route   GET /api/cars
// @access  Private
exports.getCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id).populate('categoryId').lean();
  res.status(httpStatus.OK).json({
    success: true,
    data: car,
  });
});

// @desc    Update car
// @route   PATCH /api/cars/:id
// @access  Private
exports.updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: messages.CAR.NOT_FOUND,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: messages.CAR.UPDATED,
    data: car,
  });
});

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private
exports.deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: messages.CAR.NOT_FOUND,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: messages.CAR.DELETED,
    data: {},
  });
});

// @desc    Get number of cars
// @route   GET /api/cars/count
// @access  Private
exports.getCarCount = asyncHandler(async (req, res) => {
  const count = await Car.countDocuments();
  res.status(httpStatus.OK).json({
    success: true,
    count,
  });
});
