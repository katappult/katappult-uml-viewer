# Tabs CRUD API with Express

This project is a simple RESTful API for managing tabs, nodes, and edges in memory using Express.js. The API follows the MVC architecture pattern and includes ESLint and Prettier for code quality and formatting.

## Features

- **CRUD Operations**: Create, read, update, and delete tabs, nodes, and edges.
- **In-Memory Storage**: Data is stored in memory without the need for a database.
- **Unique Tab Names**: Each tab name must be unique.
- **ESLint & Prettier**: Integrated for consistent code style and quality.

## API Endpoints

### Tabs

- **GET** `/api/tabs` - Retrieve all tabs
- **GET** `/api/tabs/:id` - Retrieve a specific tab by ID
- **GET** `/api/tabs/name/:name` - Retrieve a specific tab by name
- **POST** `/api/tabs` - Create a new tab
- **PUT** `/api/tabs/:id` - Update a specific tab by ID
- **DELETE** `/api/tabs/:id` - Delete a specific tab by ID

### Nodes & Edges (Part of Tab Object)

- **Nodes**: Manage nodes within a tab (e.g., `id`, `label`, `data`, `measured`, `position`, `type`, `dragHandle`).
- **Edges**: Manage edges within a tab (e.g., `id`, `source`, `target`, `type`, `style`).
- **Viewport**: Manage the viewport of a tab (e.g., `x`, `y`, `zoom`).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
