# Orderly 🛍️

**Industry-Ready Multi-Role E-Commerce Platform**

## Project Overview

Orderly is a comprehensive e-commerce platform designed with a multi-role architecture supporting **Consumers**, **Sellers**, **Admins**, and **Delivery Personnel**. Built with modern Java and React technologies, this platform demonstrates enterprise-grade development practices including AI-powered ordering, payment integration, and real-time delivery tracking.

## 🚀 Key Features

### Multi-Role System
- **Consumer Dashboard**: Browse products, AI-powered ordering (chat & voice), cart management, checkout with Razorpay, order tracking
- **Seller Dashboard**: Product management, inventory control, order processing, sales analytics
- **Admin Dashboard**: Platform oversight, seller approvals, user management, revenue analytics
- **Delivery Dashboard**: Assignment management, GPS tracking, earnings, route navigation

### Advanced Capabilities
- **AI Ordering**: Chat and voice-based product ordering using Groq API
- **Payment Integration**: Razorpay payment gateway for secure transactions
- **Maps Integration**: Google Maps for delivery tracking and route optimization
- **Real-time Tracking**: Live order and delivery status updates
- **Multi-tenant Architecture**: Clean separation of concerns for different user roles

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI library
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling (v4.x)
- **React Router**: Client-side routing
- **Zustand**: State management
- **TanStack Query**: Data fetching and caching
- **Recharts**: Data visualization

### Backend
- **Java 17**: Modern Java features
- **Spring Boot 3.2.1**: Enterprise application framework
- **Spring Security**: Authentication and authorization
- **Spring Data JPA**: Database abstraction
- **PostgreSQL**: Relational database
- **JWT**: Stateless authentication
- **MapStruct**: DTO mapping
- **Lombok**: Code generation
- **SpringDoc OpenAPI**: API documentation

### External Integrations
- **Groq AI**: Chat and voice ordering
- **Razorpay**: Payment processing (India)
- **Google OAuth**: Social authentication
- **Google Maps API**: Location and routing

## 📦 Project Structure

```
Orderly/
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/orderly/backend/
│   │   ├── config/          # Security, CORS configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── exception/       # Exception handling
│   │   ├── repository/      # Data repositories
│   │   ├── security/        # JWT, UserDetails
│   │   ├── service/         # Business logic
│   │   └── util/            # Utilities
│   └── src/main/resources/
│       ├── application.properties
│       └── schema.sql       # Database schema
├── frontend/                # React + Vite application
└── .env.example            # Environment variables template
```

## 🚦 Getting Started

### Prerequisites
- **Java JDK 17+**
- **Node.js 18+**
- **PostgreSQL 15+**
- **Maven 3.8+**

### Database Setup

1. Install PostgreSQL and create database:
```bash
createdb orderly_db
```

2. Update credentials in `backend/src/main/resources/application.properties`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure:

- Database credentials
- JWT secret (generate secure random string)
- Google OAuth credentials
- Razorpay API keys
- Google Maps API key
- Groq API key

## 📚 API Documentation

Once the backend is running, access Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

## 🗃️ Database Schema

The platform uses a normalized PostgreSQL schema with:
- User management (users, roles, addresses)
- Product catalog (categories, products, images)
- Order processing (orders, order items, status history)
- Payment tracking (Razorpay integration)
- Delivery management (assignments, locations)
- Reviews and ratings
- AI chat sessions
- Analytics

## 🏗️ Current Status

### ✅ Completed
- Database schema design and JPA entities
- Spring Security with JWT authentication
- Role-based access control (RBAC)
- User registration and login APIs
- Repository layer with custom queries
- Global exception handling
- CORS configuration
- Auto role initialization

### 🚧 In Progress
- Product management APIs
- Order processing system
- Frontend React components
- Dashboard implementations

### 📋 Planned
- Payment integration (Razorpay)
- AI ordering module (Groq)
- Maps integration (Google Maps)
- Delivery tracking system
- Analytics dashboards
- Docker deployment

## 🤝 Contributing

This project is in active development. Contributions and suggestions are welcome!

## 📄 License

This project is developed for educational and portfolio purposes.

---

*Built with ❤️ by [viru0909-dev](https://github.com/viru0909-dev)*
