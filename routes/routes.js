const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const path = require('path');

router.get('/api/pizza', controller.listPizzas);
router.get('/api/allergen', controller.listAllergens);
router.get('/order', controller.listOrders);
router.post('/order', controller.placeOrders);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/', 'index.html'));
});

module.exports = router;
