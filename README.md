
# Pizza and Allergen API with UI

## Overview

This project provides a comprehensive solution for managing pizza types, allergens, and pizza orders. It utilizes an Express.js API server to serve data related to pizzas and their allergens, and offers a dynamic UI for listing pizzas, filtering them by allergens, and placing orders.

## Features

- **API Endpoints:**
  - `/api/pizza` for listing pizza types with allergens.
  - `/api/allergen` for listing all available allergens.
  - `/api/order` for getting and posting pizza orders.
- **UI:**
  - A pizza list page at `/pizza/list` that displays all pizzas and their details, including allergen names, and allows filtering by allergens.
  - Order functionality with the ability to add pizzas to an order and submit customer details.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- Basic knowledge of Express.js and RESTful APIs.

### Installation

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Your API server will be running on `http://localhost:3000`.

## Usage

### Accessing the API

- **Get Pizza List:**

```bash
GET /api/pizza
```

- **Get Allergen List:**

```bash
GET /api/allergen
```

- **Get Orders List:**

```bash
GET /api/order
```

- **Post a New Order:**

```bash
POST /api/order
Content-Type: application/json

{
  "pizzas": [{"id": 1, "amount": 2}],
  "date": {"year": 2022, "month": 6, "day": 7, "hour": 18, "minute": 47},
  "customer": {"name": "John Doe", "email": "jd@example.com", "address": {"city": "Palermo", "street": "Via Appia 6"}}
}
```

### Using the UI

- Visit `/pizza/list` to view and filter pizzas by allergens.
- Add pizzas to your order and fill out the customer details form to place an order.

## Project Structure

- `/api` - Contains the Express.js routes for pizzas, allergens, and orders.
- `/data` - JSON files storing the static data for pizzas and allergens.
- `/public` - Frontend assets and UI implementation.
- `/views` - HTML templates for the UI.

## Contributing

Feel free to fork the project and submit pull requests with new features or fixes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.