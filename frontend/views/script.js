function fetchPizzasAndAllergens() {
  Promise.all([
    fetch('http://127.0.0.1:9001/api/pizza').then((response) => response.json()),
    fetch('http://127.0.0.1:9001/api/allergen').then((response) => response.json()),
  ])
    .then(([pizzas, allergens]) => {
      const pizzaList = document.getElementById('pizza-list');

      pizzas.forEach((pizza) => {
        const pizzaItem = document.createElement('div');
        pizzaItem.classList.add('pizza-item');

        const pizzaName = document.createElement('h2');
        pizzaName.textContent = pizza.name;
        pizzaName.classList.add('pizza-name');

        const pizzaImg = document.createElement('img');
        pizzaImg.src = '/img/pizza.png';
        pizzaImg.classList.add('pizza-img');

        pizzaItem.appendChild(pizzaImg);


        const pizzaPrice = document.createElement('span');
        pizzaPrice.textContent = `${pizza.price / 100}$`;
        pizzaPrice.classList.add('pizza-price');

        const pizzaIngredients = document.createElement('p');
        pizzaIngredients.textContent = `Ingredients: ${pizza.ingredients.join(', ')}`;
        pizzaIngredients.classList.add('pizza-ingredients');

        const pizzaAllergens = document.createElement('p');
        const allergenNames = pizza.allergens.map((id) => allergens.find((allergen) => allergen.id === id).name);
        pizzaAllergens.textContent = `Contains: ${allergenNames.join(', ')}`;
        pizzaAllergens.classList.add('pizza-allergens');

        pizzaItem.appendChild(pizzaName);
        pizzaItem.appendChild(pizzaPrice);
        pizzaItem.appendChild(pizzaIngredients);
        pizzaItem.appendChild(pizzaAllergens);

        pizzaList.appendChild(pizzaItem);
      });
    });
}

const pizzaListElement = document.getElementById('pizza-list');

const userForm = () => {
  const userFormContainer = document.createElement('div');
  userFormContainer.id = 'container';
  pizzaListElement.appendChild(userFormContainer);
  const form = document.createElement('form');
  form.id = 'customerForm';
  form.method = 'POST';
  form.action = '/api/order';
  userFormContainer.appendChild(form);

  document.getElementById('customerForm').insertAdjacentHTML('beforeend',
    `<label for='name'>Name:</label>
  <input type='text' name='name', required><br>
  <label for='email'>Email address:</label>
  <input type='text' name='email', required><br>
  <label for='city'>City:</label>
  <input type='text' name='city', required><br>
  <label for='street'>Street and number:</label>
  <input type='text' name='street', required><br>
  <button id='orderButton'>Place order</button>`);
};

const getUserInfo = () => {
  const form = document.getElementById('customerForm');
  const userInfo = {
    'name': form.elements.name.value,
    'email': form.elements.email.value,
    'address': {
      'city': form.elements.city.value,
      'street': form.elements.street.value,
    },
  };
  return userInfo;
};

const saveUserButtonListener = () => {
  const button = document.getElementById('orderButton');
  button.addEventListener('click', () => {
    const customer = getUserInfo();
    console.log(customer);
  });
};

const getDate = () => {
  const currentDateAndTime = new Date();
  const orderDateAndTime = {
    'year': currentDateAndTime.getFullYear(),
    'month': currentDateAndTime.getMonth() + 1,
    'day': currentDateAndTime.getDate(),
    'hour': currentDateAndTime.getHours(),
    'minute': currentDateAndTime.getMinutes(),
  };
  return orderDateAndTime;
};

const orderButtonListener = () => {
  const button = document.getElementById('orderButton');
  button.addEventListener('click', () => {
    const date = getDate();
    console.log(date);
  });
};

const loadEvent = () => {
  userForm();
  getUserInfo();
  getDate();
  orderButtonListener();
  saveUserButtonListener();
};

window.addEventListener('load', loadEvent);
document.addEventListener('DOMContentLoaded', fetchPizzasAndAllergens);