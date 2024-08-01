# User API REST

A simple RESTful API for managing users, built with Node.js, Express, and MongoDB.

## Features

- User authentication using JWT
- Create, retrieve, update, and delete tasks
- Input validation with Joi
- Security enhancements with Helmet
- Cross-Origin Resource Sharing (CORS) enabled

## Prerequisites

- Node.js
- MongoDB
- Docker (optional, for containerization)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/GDS2005/ecommerce-user-service
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the content of .env.example. Modify has you need


4. **Run the application**:

    ```bash
    npm start
    ```

5. **Access the API**:

    Open your browser and navigate to `http://localhost:{{PORT}}`.

## Docker

To run the application using Docker, follow these steps:

1. **Build the Docker image**:

    ```bash
    docker build -t node-rest-user .
    ```

2. **Run the Docker container**:

    ```bash
    docker run -d -p {{PORT}}:{{PORT}} --name node-rest-user-container --env-file .env node-rest-user
    ```

3. **Access the API**:

    Use POST, GET, PATCH and DELETE in `http://localhost:{{PORT}}`.

## API Endpoints

### Authentication

- **Login**: `POST /v1/login`
- **Register**: `POST /v1/register`

### Users

- **Create User**: `POST /v1/`
- **Get All Users**: `GET /v1/`
- **Get User by ID**: `GET /v1/:id`
- **Update User**: `PUT /v1/:id`
- **Delete User**: `DELETE /v1/:id`



