const express= require('express');
const cartController = require('../controllers/cartController');
const router= express.Router();



router.route('')
      .get(cartController.getCart)
      .delete(cartController.clearCart)
      .post(cartController.postCart);


router.route('/items')
      .post(cartController.postItem)
      .delete(cartController.deleteItem)
      .patch(cartController.patchItem);
router.route('/checkout').post(cartController.checkout);



module.exports = router;