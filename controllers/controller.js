const fsPromises = require('fs').promises;
const path = require('path');
const fileReaderAsync = require('../utils/fileReader');
const allergenPath = path.join(__dirname, '..', 'backend', 'allergens.json');
const pizzaPath = path.join(__dirname, '..', 'backend', 'pizzas.json');
// const testOrderPath = path.join(__dirname, '..', 'backend', 'testOrders.json');
const orderPath = path.join(__dirname, '..', 'backend', 'orders.json');
const indexPath = path.join(__dirname, '..', 'frontend', 'views', 'index.html');
const ordersPagePath = path.join(__dirname, '..', 'frontend', 'views', 'orders.html');

const getMainPage = async (req, res) => {
  try {
    await res.sendFile(indexPath);
  } catch (error) {
    res.status(500).send('Failed to load main page.');
    console.error(error);
  }
};

const getOrdersPage = async (req, res) => {
  try {
    await res.sendFile(ordersPagePath);
  } catch (error) {
    res.status(500).send('FAIL');
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
    const currentOrders = await fsPromises.readFile(orderPath, 'utf8');
    const ordersArray = JSON.parse(currentOrders);

    // Set the correct id for the new order
    pizzaData.id = ordersArray.length + 1;

    // Add the new order to the array
    ordersArray.push(pizzaData);

    // Write the updated orders back to the file
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
  getOrdersPage,
};

