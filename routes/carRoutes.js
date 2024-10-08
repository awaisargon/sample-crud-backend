const express = require('express');
const {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  getCarCount,
} = require('../controllers/carController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createCar: createCarValidation, updateCar: updateCarValidation } = require('../validations/carValidation');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
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
 *               - color
 *               - model
 *               - make
 *               - registrationNo
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *               color:
 *                 type: string
 *               model:
 *                 type: string
 *               make:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Not authorized to access this route
 */
router.post('/', validate(createCarValidation), createCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
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
 *         description: List of cars retrieved successfully
 *       401:
 *         description: Not authorized to access this route
 */
router.get('/', getCars);

/**
 * @swagger
 * /cars/{id}:
 *   patch:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               color:
 *                 type: string
 *               model:
 *                 type: string
 *               make:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Invalid data provided
 *       401:
 *         description: Not authorized to access this route
 *       404:
 *         description: Car not found
 */
router.patch('/:id', validate(updateCarValidation), updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       401:
 *         description: Not authorized to access this route
 *       404:
 *         description: Car not found
 */
router.delete('/:id', deleteCar);

/**
 * @swagger
 * /cars/count:
 *   get:
 *     summary: Get number of cars
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Number of cars retrieved successfully
 *       401:
 *         description: Not authorized to access this route
 */
router.get('/count', getCarCount);

module.exports = router;
