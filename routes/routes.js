const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/api/pizza', controller.listPizzas);
router.get('/api/allergen', controller.listAllergens);
/*router.get('/pizza/list', );
router.get('/api/order', );
router.post('/api/order', );*/

module.exports = router;
