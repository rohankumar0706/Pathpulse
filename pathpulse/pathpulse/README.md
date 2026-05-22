# PathPulse 🗺️

> **Real-time journey intelligence platform** — track routes, analyse travel patterns, and share adventures across any transport mode.

![PathPulse Banner](docs/banner.png)

[![Build Status](https://github.com/yourusername/pathpulse/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/pathpulse/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green.svg)](https://spring.io/projects/spring-boot)

---

## 🚀 Overview

PathPulse is a **production-ready, full-stack journey tracking platform** built on a microservices architecture. It delivers sub-second GPS telemetry ingestion via Apache Kafka, persistent route storage in PostgreSQL, ultra-fast session caching with Redis, and a real-time React dashboard powered by WebSockets.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🛰️ **Live GPS Tracking** | Sub-100ms location updates via WebSocket streams |
| ⛽ **Smart Fuel Estimation** | ML-based fuel consumption model per vehicle type |
| 🚗 **Multi-Mode Transport** | Car, motorcycle, bicycle, foot, public transit |
| 📊 **Analytics Dashboard** | Route history, speed heatmaps, CO₂ footprint |
| 👥 **Social Layer** | Follow friends, share journeys, leaderboards |
| 🔔 **Geo-Alerts** | Custom zone entry/exit notifications |
| 📱 **Cross-Platform** | React web + Flutter mobile (iOS & Android) |
| 🔐 **JWT Auth** | Secure stateless authentication with refresh tokens |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Client Layer                               │
│         React Web App              Flutter Mobile App               │
└────────────────────────┬────────────────────────────────────────────┘
                         │  HTTPS / WSS
┌────────────────────────▼────────────────────────────────────────────┐
│                      API Gateway (Spring Cloud)                     │
│              Rate Limiting · Auth Filter · Load Balancing           │
└──┬──────────────┬──────────────┬──────────────┬─────────────────────┘
   │              │              │              │
┌──▼──┐      ┌───▼───┐     ┌────▼───┐     ┌────▼────┐
│Auth │      │Journey│     │Analytics│    │Social   │
│Svc  │      │Svc    │     │Svc      │    │Svc      │
└──┬──┘      └───┬───┘     └────┬────┘    └────┬────┘
   │              │              │              │
   └──────────────┴──────┬───────┴──────────────┘
                         │
              ┌──────────▼──────────┐
              │    Apache Kafka     │
              │  (Event Streaming)  │
              └──────────┬──────────┘
                         │
        ┌────────────────┼──────────────────┐
        │                │                  │
   ┌────▼────┐    ┌───────▼──────┐   ┌──────▼──────┐
   │PostgreSQL│    │    Redis     │   │  ScyllaDB   │
   │(Primary) │    │  (Cache/     │   │ (Time-series│
   │          │    │   Sessions)  │   │  GPS data)  │
   └──────────┘    └──────────────┘   └─────────────┘
```

---

## 🛠️ Tech Stack

### Backend
- **Java 17** + **Spring Boot 3.2** — Core application framework
- **Spring Security** + **JWT** — Authentication & authorisation
- **Spring Data JPA** — ORM for PostgreSQL
- **Spring WebFlux** — Reactive WebSocket for live tracking
- **Apache Kafka 3.6** — High-throughput GPS event streaming
- **PostgreSQL 16** — Primary relational datastore
- **Redis 7** — Session cache, rate limiting, pub/sub
- **ScyllaDB** — Time-series GPS coordinate storage
- **Spring Cloud Gateway** — API gateway & routing

### Frontend
- **React 18** + **TypeScript** — Web application
- **Vite** — Lightning-fast build tool
- **Zustand** — Lightweight state management
- **React Query** — Server-state synchronisation
- **Mapbox GL JS** — Interactive map rendering
- **Recharts** — Analytics visualisations
- **Tailwind CSS** — Utility-first styling
- **Socket.IO Client** — Real-time WebSocket

### Mobile
- **Flutter 3** + **Dart** — Cross-platform mobile app
- **Riverpod** — State management
- **Google Maps Flutter** — Native map integration

### DevOps
- **Docker** + **Docker Compose** — Containerisation
- **GitHub Actions** — CI/CD pipeline
- **Nginx** — Reverse proxy

---

## 📂 Project Structure

```
pathpulse/
├── backend/                        # Spring Boot microservice
│   └── src/main/java/com/pathpulse/
│       ├── config/                 # App, Kafka, Redis, Security configs
│       ├── controller/             # REST & WebSocket controllers
│       ├── service/                # Business logic layer
│       ├── repository/             # JPA + ScyllaDB repositories
│       ├── model/                  # JPA entities
│       ├── dto/                    # Request/Response DTOs
│       ├── kafka/                  # Producers & consumers
│       ├── security/               # JWT filter, UserDetails
│       └── websocket/              # WebSocket handlers
├── frontend/                       # React 18 + TypeScript web app
│   └── src/
│       ├── components/             # Reusable UI components
│       ├── pages/                  # Route-level page components
│       ├── hooks/                  # Custom React hooks
│       ├── services/               # API client layer
│       ├── store/                  # Zustand global state
│       └── utils/                  # Helpers & constants
├── gateway/                        # Spring Cloud Gateway config
├── docker/                         # Dockerfiles per service
├── docs/                           # Architecture diagrams & API docs
├── .github/workflows/              # CI/CD pipelines
└── docker-compose.yml              # Full local dev stack
```

---

## ⚡ Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.9+

### 1. Clone
```bash
git clone https://github.com/rohankumar0706/pathpulse.git
cd pathpulse
```

### 2. Start Infrastructure
```bash
docker-compose up -d postgres redis kafka scylladb
```

### 3. Run Backend
```bash
cd backend
mvn spring-boot:run
# API available at http://localhost:8080
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

### 5. Full Stack (Docker)
```bash
docker-compose up --build
# App available at http://localhost:3000
```

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login, returns JWT |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Invalidate session |

### Journeys
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/journeys` | List user's journeys |
| POST | `/api/v1/journeys` | Start new journey |
| GET | `/api/v1/journeys/{id}` | Journey details + route |
| PUT | `/api/v1/journeys/{id}/end` | End active journey |
| DELETE | `/api/v1/journeys/{id}` | Delete journey |

### Real-time Tracking
| Type | Endpoint | Description |
|------|----------|-------------|
| WS | `/ws/track/{journeyId}` | Live GPS stream |
| WS | `/ws/live/{userId}` | Watch friend's journey |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/summary` | User stats overview |
| GET | `/api/v1/analytics/heatmap` | Speed heatmap data |
| GET | `/api/v1/analytics/fuel` | Fuel consumption history |

---

## 🧪 Testing

```bash
# Backend unit + integration tests
cd backend && mvn test

# Frontend tests
cd frontend && npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Rohan Kumar**
- GitHub: [rohankumar0706](https://github.com/rohankumar0706)
- LinkedIn: [rohankumar0706](https://linkedin.com/in/rohankumar0706)
- Email: rohankumar07062005@gmail.com