# BirdsWorld API

A modern RESTful API for managing bird data built with Node.js, Express, and MongoDB, with full observability through New Relic APM and structured logging.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Observability](#observability)
  - [Application Performance Monitoring (APM)](#application-performance-monitoring-apm)
  - [Log Forwarding](#log-forwarding)
  - [Configuration](#configuration)
- [Logging](#logging)
  - [Implementation](#implementation)
  - [Log Format](#log-format)
  - [Log Forwarding to New Relic](#log-forwarding-to-new-relic)
- [Testing](#testing)
- [Docker Deployment](#docker-deployment)
  - [Multi-stage Dockerfile](#multi-stage-dockerfile)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running with Docker](#running-with-docker)
  - [Docker Compose](#docker-compose)
  - [Benefits of Distroless Images](#benefits-of-distroless-images)
- [Environment Variables](#environment-variables)
- [Development](#development)
  - [Code Structure](#code-structure)
  - [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

### Tech Stack

#### Backend

- **Node.js** (ES Modules)
- **Express.js** (v5.1.0) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.17.0) - MongoDB ODM

#### Observability & Monitoring

- **New Relic** (v13.2.1) - APM and log management
- **Winston** (v3.17.0) - Logging library
- **Winston Daily Rotate File** (v5.0.0) - Log rotation

#### Development & Testing

- **Mocha** (v11.7.1) - Test framework
- **Chai** (v5.2.1) - Assertion library
- **Chai HTTP** (v5.1.2) - HTTP assertions
- **Supertest** (v7.1.4) - HTTP testing

#### API Documentation

- **Swagger UI** (v5.0.1) - Interactive API docs

## Architecture

This application follows a layered architecture pattern:

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "background": "#f4f7f9",
    "primaryColor": "#d1c4e9",
    "primaryTextColor": "#311b92",
    "primaryBorderColor": "#673ab7",
    "lineColor": "#616161",
    "fontSize": "18px",
    "fontFamily": "Arial",
    "nodePadding": "15px"
  },
  "config": {
    "curve": "basis"
  }
}}%%

graph LR
    %% ==== Client ====
    subgraph Client
        A["👤 User / API Client"]
    end

    %% ==== Application Server ====
    subgraph "Application Server (Node.js / Express.js)"
        B["🌐 REST API Endpoints"]
        C["📖 Swagger UI"]
        D["🛣️ Routes"]
        E["🧩 Controllers"]
        F["⚙️ Services / Business Logic"]
        G["🗂️ Mongoose Models"]
        L["📝 Winston Logger"]
    end

    %% ==== Observability ====
    subgraph Observability
        H["📊 New Relic APM"]
        I["📂 New Relic Log Management"]
    end

    %% ==== Data Store ====
    subgraph "Data Store"
        K["🍃 MongoDB"]
    end

    %% ==== Logging Infrastructure ====
    subgraph "Logging Infrastructure"
        M["💻 Console Transport (JSON)"]
        N["📁 File Transport (JSON)"]
    end

    %% ==== Flows ====
    A --> B
    B --> C
    B --> D
    D --> E
    E --> F
    F --> G
    G --> K
    B --> H
    B --> L
    L --> M
    L --> N
    M --> I

    %% ==== Styles (per section) ====
    style A fill:#b3e5fc,stroke:#0288d1,stroke-width:2px,color:#01579b
    style B fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style C fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style D fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style E fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style F fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style G fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style L fill:#d1c4e9,stroke:#673ab7,stroke-width:2px,color:#311b92
    style H fill:#ffe082,stroke:#f57f17,stroke-width:2px,color:#e65100
    style I fill:#ffe082,stroke:#f57f17,stroke-width:2px,color:#e65100
    style K fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20
    style M fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#b71c1c
    style N fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#b71c1c
```

### Architecture Flows

The diagram illustrates the following key flows in the application:

1. **Client Request Flow**:
   - **Users or API clients** interact with the **REST API Endpoints**
   - The API serves both the **Swagger UI documentation** and processes API requests through **Routes**

2. **Request Processing Pipeline**:
   - **Routes** direct requests to **Controllers**
   - **Controllers** handle HTTP concerns and delegate business logic to **Services**
   - **Services** interact with **Mongoose Models** to perform database operations
   - **Models** interface with the **MongoDB database** for data persistence

3. **Observability and Monitoring**:
   - All API requests are monitored by **New Relic APM** for performance tracking
   - Application events are logged using **Winston Logger**
   - Logs are sent to both **Console Transport** and **File Transport**
   - **Console logs** are automatically forwarded to **New Relic Log Management**

## Screenshots

Here are some screenshots of the application in action:

### Architecture Diagram
![Architecture](images/architecture.png)

### Swagger UI
![Swagger UI](images/swagger-ui.png)

### Distributed Tracing
![Distributed Tracing](images/distributed-tracing.png)

### Transactions
![Transactions](images/transactions.png)

### Databases
![Databases](images/databases.png)

### Logs
![Logs](images/logs.png)

### Log Details
![Log Details](images/log-details.png)

### Key Components

1. **Controllers**: Handle HTTP requests/responses
2. **Services**: Business logic and database operations
3. **Models**: Data schemas and Mongoose models
4. **Routes**: API endpoint definitions
5. **Logger**: Centralized logging with Winston and New Relic integration
6. **New Relic**: APM and log forwarding for observability

### Bird Data Model

The bird data model consists of the following fields:

- `name` (String, required) - The name of the bird
- `breed` (String, required) - The breed/species of the bird
- `age` (Number, required) - The age of the bird in years

The model also includes automatic timestamp fields:
- `createdAt` - When the bird record was created (automatically set)
- `updatedAt` - When the bird record was last updated (automatically updated)

## Features

- Full CRUD operations for bird data (Create, Read, Update, Delete)
- MongoDB integration with Mongoose ODM
- Comprehensive API documentation with Swagger UI
- Structured JSON logging with Winston
- Application Performance Monitoring with New Relic APM
- Automatic log forwarding to New Relic
- MongoDB query monitoring and tracing
- Error handling with detailed logging
- Automated test suite with Mocha and Chai
- New Relic segment tracing for service operations

## Project Structure

```javascript
BirdsWorld/
├── app.js                 // Application entry point
├── logger.js              // Centralized logging configuration
├── newrelic.cjs           // New Relic configuration
├── swagger.json           // Swagger API specification
├── .env                   // Environment variables
├── controllers/           // Request handlers
│   └── BirdController.js  // Bird CRUD operations
├── models/                // Data models
│   └── Bird.js            // Bird schema and model
├── routes/                // API route definitions
│   └── BirdRoutes.js      // Bird API routes
├── services/              // Business logic
│   └── BirdService.js     // Bird database operations
├── test/                  // Test suite
│   ├── Bird.js            // Bird API tests
│   └── run.js             // Test runner
└── logs/                  // Log files (created automatically)
```

## Getting Started

### Prerequisites

- Docker (recommended) OR Node.js (v18 or higher) installed locally
- New Relic account (optional, for APM and logging)

### Option 1: Using Docker (Recommended)

This project includes Docker support for easy deployment. You can run the entire application stack (including MongoDB) with a single command:

1. Build and run the application with docker-compose:
   ```bash
   docker-compose up --build
   ```

2. Access the API at `http://localhost:3001`
3. Access the Swagger UI documentation at `http://localhost:3001/swagger/`

To stop the application:
```bash
docker-compose down
```

### Option 2: Manual Installation

If you prefer to run the application manually without Docker:

#### MongoDB Setup

This application requires a MongoDB database to be running. You can set up MongoDB in one of the following ways:

##### Using Docker (for MongoDB only)
```bash
docker run --name mongodb-birds -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -d mongo:latest
```

##### Install MongoDB locally

1. Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/installation/) for your operating system
2. Start the MongoDB service
3. Create the required user:
   ```bash
   mongosh
   use swagger
   db.createUser({user: "root", pwd: "secret", roles: ["readWrite"]})
   ```

##### Using MongoDB Atlas (Cloud)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Configure database access and network access
4. Update the MongoDB connection string in `app.js` with your Atlas connection string

#### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd BirdsWorld
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Start MongoDB (if using local installation)

### Running the Application

Start the application:

```bash
npm start
```

The API will be available at `http://localhost:3001`

Access the Swagger UI documentation at `http://localhost:3001/swagger/`

Test the logging functionality at `http://localhost:3001/test-logging`

## API Documentation

Once the application is running, you can access the interactive API documentation at:

```
http://localhost:3001/swagger/
```

You can use the Swagger UI to:

1. View all available endpoints
2. See detailed information about request/response formats
3. Test API endpoints directly from the browser
4. Generate client code

### Using Swagger UI

1. Start the application with `npm start`
2. Navigate to `http://localhost:3001/swagger/` in your browser
3. You'll see a list of available endpoints grouped by tags
4. Click on any endpoint to expand it and see details
5. Click "Try it out" to test the endpoint directly
6. Fill in any required parameters
7. Click "Execute" to make the API call
8. View the response, status code, and headers directly in the UI

### Example Requests via Swagger UI

1. **Creating a new bird**:
   - Expand the `POST /api/birds` endpoint
   - Click "Try it out"
   - In the request body, enter:

     ```json
     {
       "name": "Robin",
       "breed": "European Robin",
       "age": 2
     }
     ```

   - Click "Execute"
   - View the response in the "Responses" section

2. **Getting all birds**:
   - Expand the `GET /api/birds` endpoint
   - Click "Try it out"
   - Click "Execute"
   - View the list of birds in the response

3. **Getting a specific bird**:
   - Expand the `GET /api/birds/{id}` endpoint
   - Click "Try it out"
   - Enter a valid bird ID in the `id` field
   - Click "Execute"
   - View the bird details in the response

4. **Updating a bird**:
   - Expand the `PUT /api/birds/{id}` endpoint
   - Click "Try it out"
   - Enter a valid bird ID in the `id` field
   - In the request body, enter updated information. Here are some example bird data you can use:

     ```json
     {
       "name": "Blue Jay",
       "breed": "Cyanocitta cristata",
       "age": 2
     }
     ```

   - Here are 10 example birds you can use for testing:
     - Name: Blue Jay, Breed: Cyanocitta cristata, Age: 2
     - Name: Northern Cardinal, Breed: Cardinalis cardinalis, Age: 4
     - Name: American Goldfinch, Breed: Spinus tristis, Age: 1
     - Name: European Robin, Breed: Erithacus rubecula, Age: 3
     - Name: Barn Owl, Breed: Tyto alba, Age: 5
     - Name: Peregrine Falcon, Breed: Falco peregrinus, Age: 6
     - Name: House Sparrow, Breed: Passer domesticus, Age: 2
     - Name: Common Blackbird, Breed: Turdus merula, Age: 3
     - Name: Great Horned Owl, Breed: Bubo virginianus, Age: 4
     - Name: Scarlet Macaw, Breed: Ara macao, Age: 7

   - Click "Execute"
   - View the updated bird in the response

5. **Deleting a bird**:
   - Expand the `DELETE /api/birds/{id}` endpoint
   - Click "Try it out"
   - Enter a valid bird ID in the `id` field
   - Click "Execute"
   - Confirm deletion with the status code 200

### API Endpoints

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| GET    | `/api/birds`      | Get all birds         |
| POST   | `/api/birds`      | Create a new bird     |
| GET    | `/api/birds/:id`  | Get a bird by ID      |
| PUT    | `/api/birds/:id`  | Update a bird by ID   |
| DELETE | `/api/birds/:id`  | Delete a bird by ID   |

All API responses follow the format:
```json
{
  "data": ...,  // The actual data
  "status": "success"  // Status indicator
}
```

Error responses follow the format:
```json
{
  "error": "Error message"
}
```

**Note**: 
- GET requests return a `data` array for collections and a `data` object for single items
- POST, PUT, and DELETE requests return the affected bird object in the `data` field
- Error responses include appropriate HTTP status codes (404 for not found, 500 for server errors)

### Example Requests via cURL

1. **Create a new bird**:

   ```bash
   curl -X POST http://localhost:3001/api/birds \
        -H "Content-Type: application/json" \
        -d '{"name": "Robin", "breed": "European Robin", "age": 2}'
   ```

2. **Get all birds**:

   ```bash
   curl -X GET http://localhost:3001/api/birds
   ```

3. **Get a bird by ID**:

   ```bash
   curl -X GET http://localhost:3001/api/birds/{bird_id}
   ```

4. **Update a bird**:

   ```bash
   curl -X PUT http://localhost:3001/api/birds/{bird_id} \
        -H "Content-Type: application/json" \
        -d '{"name": "Updated Robin", "breed": "European Robin", "age": 3}'
   ```

5. **Delete a bird**:

   ```bash
   curl -X DELETE http://localhost:3001/api/birds/{bird_id}
   ```

## Observability

This application uses New Relic for comprehensive observability:

### Application Performance Monitoring (APM)

- Tracks HTTP request performance with automatic transaction tracing
- Monitors database query performance with MongoDB instrumentation
- Provides transaction tracing for request flows
- Captures error rates and response times
- Slow transaction detection and analysis
- Database query explain plans for slow queries

### Log Forwarding

- Application logs are automatically forwarded to New Relic
- Structured logging with Winston in JSON format
- Error tracking and analysis with stack traces
- Log retention and search capabilities in New Relic

### Configuration

New Relic is configured through:

- `newrelic.cjs` - Main configuration file with detailed settings
- Environment variables in `.env` for license key and app name

**Note**: New Relic is optional but recommended for production deployments. The application will run without New Relic if the license key is not provided.

## Logging

### Implementation

The application uses Winston for structured logging with two transports:

1. **Console Transport**: Outputs JSON formatted logs to stdout for New Relic to capture
2. **File Transport**: Writes logs to rotating daily files in the `logs/` directory

### Log Format

All logs are JSON formatted with:

- Timestamp
- Log level (info, error, warn, etc.)
- Message
- Additional metadata

Example log entry:

```json
{
  "timestamp": "2025-08-23T20:11:41.890Z",
  "level": "info",
  "message": "Creating new bird",
  "birdData": {
    "name": "Blue Jay",
    "breed": "Cyanocitta cristata",
    "age": 2
  }
}
```

### Log Forwarding to New Relic

Logs are automatically forwarded to New Relic through:

1. JSON formatted stdout output
2. New Relic's log forwarding configuration in `newrelic.cjs`

### Logging Configuration

The logger is configured with:

- Daily rotating log files (kept for 14 days)
- Error stack trace capture
- Splat formatting for parameterized messages
- JSON formatting for structured logging
- Separate transports for console and file output

### Custom Logging Methods

The application includes a custom method to explicitly send logs to New Relic:

```javascript
logger.sendToNewRelic(level, message, metadata)
```

This method can be used to send specific log messages directly to New Relic's log management system.

### Test Logging Endpoint

A test endpoint is available at `GET /test-logging` to verify that logging is working correctly and that logs are being forwarded to New Relic. This endpoint generates both Winston logs and direct New Relic logs for testing purposes.

## Testing

Run the test suite with:

```bash
npm test
```

Tests are written using:

- Mocha (test framework)
- Chai (assertions)
- Chai HTTP (HTTP assertions)

Test files are located in the `test/` directory and cover all CRUD operations for birds:

- `GET /api/birds` - Retrieve all birds (empty initially)
- `POST /api/birds` - Create a new bird
- `GET /api/birds/:id` - Retrieve a specific bird
- `PUT /api/birds/:id` - Update a specific bird
- `DELETE /api/birds/:id` - Delete a specific bird

**Note**: 
- The tests will clear the birds collection before each test run to ensure a clean state
- Tests use an in-memory connection to the Express app
- All tests should pass with the default configuration
- Test coverage includes both success and error cases

## Docker Deployment

This project includes Docker support for easy deployment with a multi-stage build process that uses distroless images for enhanced security and smaller image size.

### Multi-stage Dockerfile

The Dockerfile uses a two-stage build process:

1. **Builder Stage**: Uses `node:18-alpine` to install production dependencies
2. **Production Stage**: Uses `gcr.io/distroless/nodejs18-debian11` for a minimal, secure runtime environment

### Building the Docker Image

To build the Docker image manually:

```bash
docker build -t birdsworld-api .
```

### Running with Docker

To run the application with Docker (you'll need to provide MongoDB separately):

```bash
docker run -p 3001:3001 \
  -e NEW_RELIC_LICENSE_KEY=your_key_here \
  -e NEW_RELIC_APP_NAME=BirdsWorld \
  birdsworld-api
```

### Docker Compose

For easier deployment with MongoDB included, use the provided docker-compose.yml:

```bash
docker-compose up --build
```

This will start both the MongoDB database and the BirdsWorld API application with proper networking and environment configuration.

### Benefits of Distroless Images

- **Smaller footprint**: Reduced attack surface compared to full OS images
- **Enhanced security**: No package manager, shell, or other unnecessary utilities
- **Performance**: Faster startup times and reduced resource usage
- **Compliance**: Easier to maintain and scan for vulnerabilities

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# New Relic Configuration (optional but recommended)
NEW_RELIC_LICENSE_KEY=your_license_key_here
NEW_RELIC_APP_NAME=BirdsWorld
NEW_RELIC_LOG_LEVEL=info
NEW_RELIC_LOGGING_ENABLED=true
NEW_RELIC_LOGGING_FORCE_STDOUT=true
```

**Note**: The `.env` file is already configured with default values in the repository. You can modify these values to match your New Relic account.

### MongoDB Connection Configuration

The MongoDB connection is currently hardcoded in `app.js`:
```
mongodb://root:secret@localhost:27017/swagger?authSource=admin
```

To use a different MongoDB connection (e.g., for MongoDB Atlas), modify the connection string in `app.js`:

```javascript
// For MongoDB Atlas
mongoose.connect('mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority')

// For local MongoDB with different credentials
mongoose.connect('mongodb://<username>:<password>@localhost:27017/<database>?authSource=admin')
```

**Note**: The application expects a database named `swagger` to exist. If using MongoDB Atlas or a different local setup, ensure this database is created.

## Development

### Code Structure

- All code follows ES6 module syntax (import/export)
- Controllers handle HTTP layer concerns and request/response formatting
- Services contain business logic and database operations with New Relic segment tracking
- Models define data schemas using Mongoose
- Routes define API endpoints and connect them to controllers

### Error Handling

- Centralized error handling in controllers
- Proper HTTP status codes (200 for success, 404 for not found, 500 for server errors)
- Detailed error logging with stack traces
- Errors are logged with contextual information for debugging

### New Relic Integration

- Automatic transaction tracing for all API endpoints
- MongoDB query monitoring and tracing
- Custom segment tracking for service operations using `newrelic.startSegment()`
- Automatic log forwarding to New Relic when configured
- Database instrumentation for MongoDB operations
- Slow query detection and analysis
- Error tracking and performance monitoring

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

## Author

- [Aung Aung Myo Myint](https://github.com/aungaungmyomyint)
