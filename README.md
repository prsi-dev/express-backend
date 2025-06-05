# Express Backend with TypeScript

A modern Express.js backend application built with TypeScript, following functional programming principles and clean architecture practices.

## Prerequisites
- Node.js installed on your system
- npm (Node Package Manager)
- MongoDB (Coming soon)

## Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/express-backend.git
   cd express-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
```
express-backend/
├── src/
│   ├── config/
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── common.ts
│   │   └── error.ts
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── hello.routes.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── controllers/
│   │   └── hello/
│   │       └── controller.ts
│   ├── services/
│   │   └── hello/
│   │       └── service.ts
│   ├── interfaces/
│   │   └── hello/
│   │       └── types.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Architecture Overview
- **Clean Architecture**: Follows separation of concerns with clear boundaries between layers
- **Functional Programming**: Emphasizes pure functions and immutability
- **Type Safety**: Leverages TypeScript for better type checking and developer experience
- **Modular Design**: Features are organized by domain with clear interfaces
- **Middleware Pattern**: Uses Express middleware for cross-cutting concerns
- **Version Control**: API versioning through route organization

## Key Features
- Express.js with TypeScript
- Structured error handling
- Request validation (planned)
- API versioning
- Environment configuration
- MongoDB integration (coming soon)
- Comprehensive logging (planned)
- API documentation (planned)

## API Endpoints
### v1
- `GET /api/v1/hello`: Returns a hello world message with timestamp

## Development
The server runs on `http://localhost:3000` by default.

### Available Scripts
- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the project
- `npm start`: Run the built project
- `npm test`: Run tests (coming soon)

## Upcoming Features
- [ ] MongoDB integration with Mongoose
- [ ] Authentication and authorization
- [ ] Request validation with Joi or Zod
- [ ] API documentation with Swagger
- [ ] Comprehensive test suite
- [ ] Docker support
- [ ] CI/CD pipeline

## Testing Endpoints

### Using curl
```bash
# Test the hello endpoint
curl http://localhost:3000/api/v1/hello
```

### Expected Response
```json
{
  "message": "Hello, World!",
  "timestamp": "2024-03-06T10:26:53.894Z",
  "path": "/api/v1/hello"
}
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE). 