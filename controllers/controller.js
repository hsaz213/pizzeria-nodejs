const fsPromises = require('fs').promises;
const path = require('path');
const fileReaderAsync = require('../utils/fileReader');
const allergenPath = path.join(__dirname, '..', 'backend', 'allergens.json');
const pizzaPath = path.join(__dirname, '..', 'backend', 'pizzas.json');

const listPizzas = async (req, res) => {
  try {
    const data = await fileReaderAsync(pizzaPath);
    const pizzaArray = JSON.parse(data);
    res.json(pizzaArray);
  } catch (error) {
    res.status(500).send('READ FAIL');
  }
};

const listAllergens = async (req, res) => {
  try {
    const data = await fileReaderAsync(allergenPath);
    const allergenArray = JSON.parse(data);
    res.json(allergenArray);
  } catch (error) {
    res.status(500).send('error');
  }
};

module.exports = {
  listPizzas,
  listAllergens,
};
