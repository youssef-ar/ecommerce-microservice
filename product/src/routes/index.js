const express= require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');

const router= express.Router();



router.route('').get(productController.getProducts);
router.route('/:id').get(productController.getProduct).patch(productController.patchProduct).delete(productController.deleteProduct);

router.post('', [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),
    
    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),
    
    body('category')
        .notEmpty().withMessage('Category is required')
        .isString().withMessage('Category must be a string')],productController.postProduct);



module.exports = router;