function fetchPizzasAndAllergens() {
  Promise.all([
    fetch('http://127.0.0.1:9001/api/pizza').then((response) => response.json()),
    fetch('http://127.0.0.1:9001/api/allergen').then((response) => response.json()),
  ])
    .then(([pizzas, allergens]) => {
      const pizzaList = document.getElementById('pizza-list');

      pizzas.forEach((pizza, index) => {
        const pizzaItem = document.createElement('div');
        pizzaItem.classList.add('pizza-item');
        pizzaItem.dataset.id = index;

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

        pizzaItem.insertAdjacentHTML('beforeend', 'Amount: <br><input type="number" class="pizzaAmount">');

        pizzaList.appendChild(pizzaItem);

      });
      createAddToCartButton();
      userForm();
    });
}

const pizzaListElement = document.getElementById('pizza-list');

const addToCartButtonListener = () => {
  const button = document.getElementById('addToCartButton');
  button.addEventListener('click', () => {
    document.getElementById('customerForm').classList.toggle('hidden');
  });
};

const createAddToCartButton = () => {
  const button = document.createElement('button');
  button.id = 'addToCartButton';
  button.classList.add('btn');
  button.textContent = 'Add to cart';
  document.getElementById('root').appendChild(button);
  addToCartButtonListener();
};

const orderObject = {}; /////////////////////////////////////////////////////////////////


const userForm = () => {
  const userFormContainer = document.createElement('div');
  userFormContainer.id = 'container';
  document.getElementById('root').appendChild(userFormContainer);
  const form = document.createElement('form');
  form.id = 'customerForm';
  form.method = 'POST';
  form.action = '/order';
  form.classList.add('hidden');
  userFormContainer.appendChild(form);

  document.getElementById('customerForm').insertAdjacentHTML('beforeend',
    `<label for='name'>Name:</label>
  <input type='text' name='name' class='orderFormInput', required><br>
  <label for='email'>Email address:</label>
  <input type='text' name='email' class='orderFormInput', required><br>
  <label for='city'>City:</label>
  <input type='text' name='city' class='orderFormInput', required><br>
  <label for='street'>Street and number:</label>
  <input type='text' name='street' class='orderFormInput', required><br>
  <button id='orderButton' class='btn'>Place order</button>`);

  let orderObjectId = 0;
  document.getElementById('orderButton').addEventListener('click', (event) => {
    //event.preventDefault(); ////////////////////////////////////////////////////////////////////////
    orderObjectId++;
    orderObject.id = orderObjectId;
    orderObject.pizzas = [];
    orderObject.date = getDate();
    orderObject.customer = getUserInfo();

    document.querySelectorAll('.pizzaAmount').forEach((amount) => {
      if (amount.value && amount.value !== 0) {
        const pizzaObject = {
          'id': parseInt(amount.parentElement.dataset.id) + 1,
          'amount': amount.value,
        };
        orderObject.pizzas.push(pizzaObject);
      }
    });
    console.log(orderObject);
  });
};

const getUserInfo = () => {
  const form = document.getElementById('customerForm');
  const userInfo = {
    'name': form.elements.name.value || '',
    'email': form.elements.email.value || '',
    'address': {
      'city': form.elements.city.value || '',
      'street': form.elements.street.value || '',
    },
  };
  return userInfo;
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

const loadEvent = () => {
  fetchPizzasAndAllergens();
};

window.addEventListener('load', loadEvent);
