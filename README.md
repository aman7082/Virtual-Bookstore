# 📚 Virtual Bookstore - Full-Stack E-commerce Application

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, full-stack e-commerce bookstore application built with **Spring Boot** and **React**, featuring real **UPI payment integration**, responsive design, and comprehensive book management system.

## 🌟 Features

### 🛒 **E-commerce Functionality**
- **Complete Book Catalog** - Browse 25+ books across multiple categories
- **Advanced Search** - Search by title, author, or category with real-time results
- **Shopping Cart** - Persistent cart with add/remove functionality
- **Book Details** - Detailed view with descriptions, reviews, and recommendations
- **User Reviews** - 5-star rating system with comments

### 💳 **Payment Integration**
- **UPI Payment** - Real QR code scanning with PhonePe, Google Pay, Paytm
- **Multiple Payment Methods** - Credit/Debit Cards, UPI, Cash on Delivery
- **Secure Transactions** - Bank-grade security with transaction verification
- **Payment Confirmation** - Real-time payment status updates

### 📱 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach, works on all devices
- **Interactive Components** - Smooth animations and transitions
- **3D Effects** - Modern visual effects and hover animations
- **Dark/Light Theme** - Adaptive design for better user experience

### ⚡ **Technical Excellence**
- **RESTful APIs** - 15+ well-documented API endpoints
- **Database Design** - Normalized schema with proper relationships
- **Security** - CORS protection, input validation, secure coding practices
- **Performance** - Optimized frontend and backend for fast loading

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.5.4** - Java framework for rapid development
- **Java 17** - Latest LTS version with modern features
- **Spring Data JPA** - Object-relational mapping and database operations
- **H2 Database** - In-memory database for development
- **Maven** - Dependency management and build automation

### Frontend
- **React 19.1.1** - Modern JavaScript library for UI development
- **Vite** - Fast build tool and development server
- **React Router 7.8.1** - Client-side routing for single-page application
- **Axios 1.11.0** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework for styling

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Maven 3.6+** - [Download here](https://maven.apache.org/download.cgi)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/virtual-bookstore.git
cd virtual-bookstore
```

### 2. Start the Backend (Spring Boot)
```bash
cd demo
./mvnw spring-boot:run
```
**Backend will start on:** http://localhost:8080

### 3. Start the Frontend (React)
```bash
cd frontend/my-react-app
npm install
npm run dev
```
**Frontend will start on:** http://localhost:5173

### 4. Access the Application
- **Main Application:** http://localhost:5173
- **API Documentation:** http://localhost:8080/api/books
- **H2 Database Console:** http://localhost:8080/h2-console

## 📁 Project Structure

```
virtual-bookstore/
├── demo/                           # Spring Boot Backend
│   ├── src/main/java/com/bookstore/demo/
│   │   ├── controller/             # REST API Controllers
│   │   ├── entity/                 # JPA Entity Classes
│   │   ├── repository/             # Data Access Layer
│   │   ├── dto/                    # Data Transfer Objects
│   │   └── config/                 # Configuration Classes
│   ├── src/main/resources/
│   │   └── application.properties  # Spring Boot Configuration
│   └── pom.xml                     # Maven Dependencies
├── frontend/my-react-app/          # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   ├── pages/                  # Page Components
│   │   ├── context/                # React Context for State Management
│   │   └── api.js                  # API Service Functions
│   ├── package.json                # NPM Dependencies
│   └── vite.config.js              # Vite Configuration
└── README.md                       # Project Documentation
```

## 🌐 API Documentation

### Books API
- `GET /api/books` - Get all books or search with query parameter
- `GET /api/books/{id}` - Get specific book details
- `GET /api/recommendations/{userId}` - Get personalized recommendations

### Cart API
- `GET /api/cart/{userId}` - Get user's shopping cart
- `POST /api/cart/{userId}` - Add item to cart
- `DELETE /api/cart/{userId}/{itemId}` - Remove item from cart

### Orders API
- `POST /api/orders/{userId}/checkout` - Process checkout and create order
- `GET /api/orders/{userId}` - Get user's order history

### Reviews API
- `GET /api/reviews/book/{bookId}` - Get reviews for a book
- `POST /api/reviews` - Add new review

## 💳 UPI Payment Integration

The application features **real UPI payment integration** using QR code scanning:

### How it Works
1. **Select UPI Payment** - User chooses UPI as payment method
2. **Generate QR Code** - System creates UPI payment URL and QR code
3. **Scan & Pay** - User scans QR with any UPI app (PhonePe, GPay, etc.)
4. **Complete Transaction** - Real money transfer through banking system
5. **Order Creation** - System creates order after payment confirmation

### UPI URL Structure
```
upi://pay?pa=amaubedwal@okaxis&pn=Aman%20Verma&am=1245.00&cu=INR&tn=Bookstore%20Payment
```

## 🗄️ Database Schema

### Core Entities
- **Books** - Book catalog with title, author, price, category
- **Users** - User profiles and information
- **CartItems** - Shopping cart functionality
- **Orders** - Purchase orders and history
- **OrderItems** - Individual items in orders
- **Reviews** - User reviews and ratings

### Relationships
- User → CartItems (One-to-Many)
- User → Orders (One-to-Many)
- Book → Reviews (One-to-Many)
- Order → OrderItems (One-to-Many)

## 🔒 Security Features

- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side data validation
- **SQL Injection Prevention** - Parameterized queries with JPA
- **XSS Protection** - React's built-in XSS prevention
- **Secure Payment Processing** - Bank-grade UPI security

## 📱 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Book Details
![Book Details](screenshots/book-details.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### UPI Payment
![UPI Payment](screenshots/upi-payment.png)

## 🚀 Deployment

### Local Development
```bash
# Backend
cd demo && ./mvnw spring-boot:run

# Frontend
cd frontend/my-react-app && npm run dev
```

### Production Build
```bash
# Backend JAR
cd demo && mvn clean package

# Frontend Build
cd frontend/my-react-app && npm run build
```

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Aman Verma**
- **UPI ID:** amaubedwal@okaxis
- **Email:** [your-email@example.com]
- **LinkedIn:** [Your LinkedIn Profile]
- **GitHub:** [Your GitHub Profile]

## 🙏 Acknowledgments

- **Spring Boot Team** - For the excellent framework
- **React Team** - For the powerful UI library
- **UPI System** - For enabling real payment integration
- **Open Source Community** - For the amazing tools and libraries

---

⭐ **Star this repository if you found it helpful!**

📚 **Happy Reading and Shopping!**
