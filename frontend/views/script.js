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

document.addEventListener('DOMContentLoaded', fetchPizzasAndAllergens);