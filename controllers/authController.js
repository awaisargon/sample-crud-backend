const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');
const messages = require('../constants/messages');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Generate random password
  const password = Math.random().toString(36).slice(-8);

  const user = await User.create({
    name,
    email,
    password,
  });

  // Send email with password
  await sendEmail(
    email,
    'Welcome to Our App',
    `Your account has been created. Your temporary password is: ${password}`
  );

  const token = generateToken(user._id);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: messages.AUTH.SIGNUP_SUCCESS,
    token,
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: messages.AUTH.INVALID_CREDENTIALS,
    });
  }

  const token = generateToken(user._id);

  res.status(httpStatus.OK).json({
    success: true,
    message: messages.AUTH.LOGIN_SUCCESS,
    token,
  });
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: messages.AUTH.USER_NOT_FOUND,
    });
  }

  res.status(httpStatus.OK).json({
    success: true,
    data: user,
  });
});