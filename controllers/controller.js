const fsPromises = require('fs').promises;
const path = require('path');
const fileReaderAsync = require('../utils/fileReader');
const allergenPath = path.join(__dirname, '..', 'backend', 'allergens.json');
const pizzaPath = path.join(__dirname, '..', 'backend', 'pizzas.json');
// const testOrderPath = path.join(__dirname, '..', 'backend', 'testOrders.json');
const orderPath = path.join(__dirname, '..', 'backend', 'orders.json');
const indexPath = path.join(__dirname, '..', 'frontend', 'views', 'index.html');


const getMainPage = async (req, res) => {
  try {
    await res.sendFile(indexPath);
  } catch (error) {
    res.status(500).send('Failed to load main page.');
    console.error(error);
  }
};


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

const listOrders = async (req, res) => {
  try {
    const data = await fileReaderAsync(orderPath);
    const testOrdersArray = JSON.parse(data);
    res.json(testOrdersArray);
  } catch (error) {
    res.status(500).send('READ FAIL');
    console.error(error);
  }
};

const placeOrders = async (req, res) => {
  try {
    const pizzaData = req.body;
    // const order = 
    const currentOrders = await fileReaderAsync(orderPath);
    const ordersArray = JSON.parse(currentOrders);

    ordersArray.push(pizzaData);

    await fsPromises.writeFile(orderPath, JSON.stringify(ordersArray));
    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('WRITE FAIL');
    console.error(error);
  }
};



module.exports = {
  listPizzas,
  listAllergens,
  listOrders,
  placeOrders,
  getMainPage,
};
