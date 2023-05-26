const getAllOrders = () => {
  fetch('http://127.0.0.1:9001/order').then((res) => res.json())
    .then((orderArray) => {
      const ordersElement = document.getElementById('pizza-list');
      const rootElement = document.getElementById('root');

      rootElement.insertAdjacentHTML('afterbegin', '<h1>All orders</h1>');

      orderArray.forEach((order) => {
        const year = order.date.year;
        const month = String(order.date.month).padStart(2, '0');
        const day = String(order.date.day).padStart(2, '0');
        const hour = String(order.date.hour).padStart(2, '0');
        const minute = String(order.date.minute).padStart(2, '0');

        ordersElement.insertAdjacentHTML('beforeend',
          `<div id='${order.id}' class='pizza-item'><p>Order ID: ${order.id}</p>
    <p>Order date: ${year}.${month}.${day}.<br>
    Order time: ${hour}:${minute}</p>
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
