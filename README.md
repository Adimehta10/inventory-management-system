# Inventory Management System

A full-stack Inventory Management System developed using React, FastAPI, PostgreSQL, Docker, and Railway. The application helps businesses efficiently manage products, customers, and orders through a modern and responsive interface.

---

## Features

### Dashboard

* View total products
* View total customers
* View total orders
* Monitor low stock products
* Real-time inventory overview

### Product Management

* Add new products
* View product list
* Update product information
* Delete products
* SKU validation
* Inventory quantity tracking

### Customer Management

* Add customers
* View customer records
* Delete customers
* Email validation
* Customer search functionality

### Order Management

* Create orders
* Select customer and product
* Automatic order total calculation
* Inventory stock update after order creation
* Delete orders

### User Interface

* Modern glassmorphism design
* Responsive layout
* Dark / Light mode
* Easy navigation
* Clean dashboard experience

---

## Technology Stack

### Frontend

* React
* React Router
* Axios
* CSS

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

### DevOps & Deployment

* Docker
* Docker Compose
* Railway

---

## Project Structure

```text
Inventory-System

├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── context
│   └── Dockerfile
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── database.py
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Adimehta10/inventory-management-system.git

cd inventory-management-system
```

### Run Using Docker

```bash
docker-compose up --build
```

### Run Frontend

```bash
cd frontend

npm install

npm run dev
```

### Run Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## API Documentation

Swagger Documentation:

https://inventory-management-system-production-a0d7.up.railway.app/docs

---

## Deployment Links

### GitHub Repository

https://github.com/Adimehta10/inventory-management-system

### Backend API

https://inventory-management-system-production-a0d7.up.railway.app

### Docker Hub Repository

https://hub.docker.com/r/aditya102011/inventory-backend

---

## Validation Rules

### Products

* SKU must be unique
* Quantity cannot be negative

### Customers

* Email must be unique

### Orders

* Product must exist
* Customer must exist
* Sufficient stock must be available

---

## Future Enhancements

* User Authentication
* Role-Based Access Control
* Product Images
* Inventory Analytics
* Sales Reports
* Export Data to Excel/PDF
* Email Notifications

---

## Author

**Aditya Mehta**

Inventory Management System Project
