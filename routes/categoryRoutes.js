const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createCategory: createCategoryValidation, updateCategory: updateCategoryValidation } = require('../validations/categoryValidation');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Not authorized to access this route
 */
router.post('/', validate(createCategoryValidation), createCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       401:
 *         description: Not authorized to access this route
 */
router.get('/', getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Not authorized to access this route
 *       404:
 *         description: Category not found
 */
router.patch('/:id', validate(updateCategoryValidation), updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Not authorized to access this route
 *       404:
 *         description: Category not found
 */
router.delete('/:id', deleteCategory);

module.exports = router;
