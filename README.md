# Express Server Setup Guide

This guide walks through setting up a modular Express.js server using functional programming principles.

## Prerequisites
- Node.js installed on your system
- npm (Node Package Manager)

## Setup Steps

1. Initialize the project:
   ```bash
   npm init -y
   ```

2. Install necessary dependencies:
   ```bash
   npm install express
   npm install --save-dev typescript @types/express @types/node ts-node nodemon
   ```

3. Create TypeScript configuration:
   ```bash
   npx tsc --init
   ```

4. Set up project structure:
   ```
   express-server/
   ├── src/
   │   ├── modules/
   │   │   └── hello/
   │   │       ├── controllers/
   │   │       │   └── helloController.ts
   │   │       ├── services/
   │   │       │   └── helloService.ts
   │   │       ├── types/
   │   │       │   └── index.ts
   │   │       └── index.ts
   │   ├── routes/
   │   │   ├── hello/
   │   │   │   └── index.ts
   │   │   └── index.ts
   │   └── index.ts
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```

5. Configure package.json scripts:
   ```json
   {
     "scripts": {
       "start": "node dist/index.js",
       "dev": "nodemon src/index.ts",
       "build": "tsc"
     }
   }
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure Explanation
- `src/`: Contains all source code files
  - `modules/`: Contains feature modules
    - `hello/`: Example module
      - `controllers/`: Pure functions for handling HTTP requests
      - `services/`: Business logic functions
      - `types/`: TypeScript interfaces and types
      - `index.ts`: Module exports
  - `routes/`: API route definitions
    - `hello/`: Routes for hello module
    - `index.ts`: Route aggregation
  - `index.ts`: Application setup and server initialization

## Architecture Principles
- **Functional Programming**: Uses pure functions and avoids classes and mutable state
- **Module Pattern**: Each feature is a self-contained module with its own types, services, and controllers
- **Separation of Concerns**: Clear separation between routes, controllers, and business logic
- **Type Safety**: Full TypeScript support with interfaces for better type checking

## Code Organization
1. **Types**: Define interfaces for request/response shapes and service contracts
2. **Services**: Implement pure business logic functions
3. **Controllers**: Pure functions that handle HTTP requests using services
4. **Routes**: Define API endpoints and connect them to controllers
5. **App**: Compose everything together using functional composition

## API Endpoints
- `GET /api/hello`: Returns a hello world message with timestamp and path information

## Development
The server will run on `http://localhost:3000` by default. Use `npm run dev` for development with hot-reload enabled.

## Testing Endpoints

### Using curl
```bash
# Test the hello endpoint
curl http://localhost:3000/api/hello
```

### Using HTTPie (more readable output)
```bash
# Install HTTPie
npm install -g httpie

# Test the hello endpoint
http :3000/api/hello
```

### Using a Web Browser
Simply visit:
- http://localhost:3000/api/hello

### Using Postman
1. Create a new GET request
2. Enter URL: `http://localhost:3000/api/hello`
3. Click Send

Expected Response:
```json
{
  "message": "Hello, World!",
  "timestamp": "2024-03-06T10:26:53.894Z",
  "path": "/"
}
```

## Production
1. Build the project: `npm run build`
2. Start the server: `npm start` 