const express= require('express');
const cartController = require('../controllers/cartController');
const router= express.Router();



router.route('/:id')
      .get(cartController.getCart)
      .delete(cartController.clearCart);

router.post('',cartController.postCart);

router.route('/items/:id')
      .post(cartController.postItem)
      .delete(cartController.deleteItem)
      .patch(cartController.patchItem);
router.route('/checkout/:id').post(cartController.checkout);



module.exports = router;