# Tabs CRUD API with Express

This project is a simple RESTful API for managing tabs, nodes, and edges in memory using Express.js. The API follows the MVC architecture pattern and includes ESLint and Prettier for code quality and formatting.

## Features

- **CRUD Operations**: Create, read, update, and delete tabs
- **In-Memory Storage**: Data is stored in memory without the need for a database.
- **ESLint & Prettier**: Integrated for consistent code style and quality.

## API Endpoints

### Tabs

- **GET** `/api/tabs` - Retrieve all tabs
- **GET** `/api/tabs/:id` - Retrieve a specific tab by ID
- **POST** `/api/tabs` - Create a new tab
- **PUT** `/api/tabs/:id` - Update a specific tab by ID
- **DELETE** `/api/tabs/:id` - Delete a specific tab by ID

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
