# nodejs-express-api-crud

## Description

This project demonstrates how to create a local API using Node.js and Express, enabling CRUD (Create, Read, Update, Delete) operations on a specific resource. It serves as a starting point for building APIs with basic data manipulation functionalities and saving data in JSON files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)

## Installation

To get this project up and running on your local machine, follow these steps:

1. Clone this repository to your local machine using:

```
git clone <https://github.com/avanish7084/nodejs-express-api-crud>
```

2. Navigate to the project directory:

```
cd project-directory
```

3. Install the required dependencies using npm:

```
npm install
```

## Usage

Once the installation is complete and the project is set up, follow these instructions to run the local API:

```
npm start
```

By default, the server will be running at `http://localhost:3000`.

## Endpoints

The following endpoints are available for performing CRUD operations:

- **GET /api/students**: Retrieve all resources.
- **GET /api/students:id**: Retrieve a specific resource by ID.
- **POST /api/students**: Create a new resource.
- **PUT /api/students/:id**: Update an existing resource by ID.
- **DELETE /api/students/:id**: Delete a resource by ID.


## Technologies Used

- Node.js
- Express

