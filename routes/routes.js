const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/api/pizza', controller.listPizzas);
router.get('/api/allergen', controller.listAllergens);
router.get('/api/order', controller.listOrders);
router.post('/api/order', controller.placeOrders);
router.get('/pizza/list',);

module.exports = router;
