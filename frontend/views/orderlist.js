const getAllOrders = () => {
  fetch('http://127.0.0.1:9001/order').then((res) => res.json())
    .then((orderArray) => {
      const ordersElement = document.getElementById('pizza-list');
      ordersElement.insertAdjacentHTML('afterbegin', '<h1>All orders</h1>');

      orderArray.forEach((order) => {
        ordersElement.insertAdjacentHTML('beforeend',
          `<div id='${order.id}' class='pizza-item'><p>Order ID: ${order.id}</p>
          <p>Order date: ${order.date.year}. ${order.date.month}. ${order.date.day}<br>
          Order time: ${order.date.hour} : ${order.date.minute}</p>
          <p>Customer: ${order.customer.name}<br>
          Address: ${order.customer.address.city}, ${order.customer.address.street}</p></div>`);
        order.pizzas.forEach((pizza) => {
          document.getElementById(`${order.id}`).insertAdjacentHTML('beforeend',
            `<p>Pizza ID: ${pizza.id}<br>
            Amount: ${pizza.amount}</p>`);
        });
      });
    });
};

getAllOrders();
