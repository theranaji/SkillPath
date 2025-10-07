# SkillPath - Technical Interview Preparation Platform

A full-stack web application for systematic placement and technical interview preparation.

## Features

- 🔐 JWT-based authentication
- 📚 15 technology sections with dynamic topics
- ✅ Progress tracking with visual charts
- 🗓️ Daily activity summary
- 📊 Section-wise completion analytics

## Tech Stack

**Backend:** Spring Boot, MySQL, JWT, Hibernate
**Frontend:** React, Chart.js, Tailwind CSS
**DevOps:** Docker, Kubernetes

## Quick Start

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# Access application
Frontend: http://localhost:3000
Backend API: http://localhost:8080
```

### Manual Setup

#### Backend
```bash
cd backend
mvn clean package
java -jar target/skillpath-backend-1.0.0.jar
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

### Kubernetes Deployment
```bash
# Apply all configurations
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services
```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/topics/{section}` - Get topics by section
- `POST /api/progress/{userId}/{topicId}` - Mark topic complete
- `GET /api/progress/{userId}` - Get user progress
- `GET /api/daily/{userId}` - Get daily activity

## Default Sections

Java, Spring Boot, Data Structures, React, HTML/CSS/JavaScript, MySQL, Docker, AWS, Terraform, Jenkins, Linux, Git, Kubernetes, Grafana, Ansible

## Database Schema

- **users**: User authentication data
- **topics**: Learning topics by section
- **user_progress**: Topic completion tracking