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
        pizzaPrice.textContent = `${pizza.price} Ft`;
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

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.classList.add('orderFormInput');
        pizzaItem.appendChild(amountInput);

        pizzaList.appendChild(pizzaItem);
      });
      // set allergen filter values
      allergens.forEach((allergen) => {
        const optionWrapper = document.createElement('label');
        const option = document.createElement('input');
        option.type = 'checkbox';
        option.value = allergen.id;
        const text = document.createTextNode(allergen.name);
        optionWrapper.appendChild(option);
        optionWrapper.appendChild(text);
        document.getElementById('checkboxes').appendChild(optionWrapper);
      });

      // filter pizzas after appending all checkboxes
      hideFiltered();
      createAddToCartButton();
      userForm();
    });

}

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
  //form.method = 'POST';
  //form.action = '/order';
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
    event.preventDefault(); ////////////////////////////////////////////////////////////////////////
    orderObjectId++;
    orderObject.id = orderObjectId;
    orderObject.pizzas = [];
    orderObject.date = getDate();
    orderObject.customer = getUserInfo();
    console.log(orderObject);

    document.querySelectorAll('div.pizza-item input.orderFormInput').forEach((amount) => {
      if (amount.value && amount.value > 0) {
        const pizzaObject = {
          'id': parseInt(amount.parentElement.dataset.id) + 1,
          'amount': amount.value,
        };
        orderObject.pizzas.push(pizzaObject);
      }
    });
    fetch('/order', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(orderObject),
    });
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

let expanded = false;

// eslint-disable-next-line no-unused-vars
function showCheckboxes() {
  const checkboxes = document.getElementById('checkboxes');
  if (!expanded) {
    checkboxes.style.display = 'block';
    expanded = true;
  } else {
    checkboxes.style.display = 'none';
    expanded = false;
  }
}


function hideFiltered() {
  document.getElementById('checkboxes').addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') {
      const selectedAllergens = Array.from(document.querySelectorAll('#checkboxes input:checked')).map((x) => x.nextSibling.textContent);

      document.querySelectorAll('.pizza-item').forEach((item) => {
        const itemAllergens = item.querySelector('.pizza-allergens').textContent
          .replace('Contains: ', '')
          .split(', ')
          .map((str) => str.trim());

        if (selectedAllergens.some((allergen) => itemAllergens.includes(allergen))) {
          item.style.display = 'none';
        } else {
          item.style.display = '';
        }
      });
    }
  });
}

const loadEvent = () => {
  fetchPizzasAndAllergens();
};

window.addEventListener('load', loadEvent);

