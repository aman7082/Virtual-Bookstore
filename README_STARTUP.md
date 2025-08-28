# Bookstore Application Startup Guide

## Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven (or use the included Maven wrapper)

## Starting the Backend (Spring Boot)

### Option 1: Using Maven Wrapper (Recommended)
```bash
cd demo
./mvnw spring-boot:run
```

### Option 2: Using the batch file
```bash
cd demo
start-backend.bat
```

### Option 3: Using JAR file
```bash
cd demo
mvn clean package -DskipTests
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Option 4: Using IDE
1. Open the project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
2. Navigate to `src/main/java/com/bookstore/demo/BookstoreApplication.java`
3. Right-click and select "Run" or "Debug"

## Starting the Frontend (React)

### Option 1: Using npm
```bash
cd frontend/my-react-app
npm install
npm run dev
```

### Option 2: Using the batch file
```bash
cd frontend/my-react-app
start-frontend.bat
```

## Verification

### Backend
- Backend should start on: http://localhost:8080
- API endpoint: http://localhost:8080/api/books
- H2 Console: http://localhost:8080/h2-console

### Frontend
- Frontend should start on: http://localhost:5173
- Main page: http://localhost:5173

## Troubleshooting

### Backend Issues
1. **Port 8080 in use**: Change port in `application.properties`
2. **Java version**: Ensure Java 17+ is installed
3. **Maven issues**: Use `mvn clean install` first

### Frontend Issues
1. **Dependencies**: Run `npm install` in frontend/my-react-app
2. **Port 5173 in use**: Vite will automatically use next available port
3. **Node version**: Ensure Node.js 16+ is installed

## Sample Data
The application automatically loads sample data including:
- 10 sample books (The Great Gatsby, 1984, etc.)
- 3 sample users
- Database is reset on each restart (H2 in-memory database)
