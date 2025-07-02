# Docker Deployment Guide

This guide explains how to deploy the OAuth2 system using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB RAM available for Docker
- Ports 3000, 6379, 8080, 8083, 8084, 9000 available

## System Architecture

The system consists of the following services:

1. **Redis** (Port 6379) - Token storage and caching
2. **Auth Server** (Port 9000) - OAuth2/OIDC Authorization Server
3. **API Gateway** (Port 8080) - Spring Cloud Gateway with JWT validation
4. **Admin Service** (Port 8083) - Admin Management API
5. **User Service** (Port 8084) - User Management API
6. **OAuth UI** (Port 3000) - React Frontend

## Quick Start

### 1. Build and Start All Services

```bash
# Build all images and start services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Check Service Status

```bash
# View all running containers
docker-compose ps

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs auth-server
docker-compose logs api-gateway
docker-compose logs oauth-ui
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Auth Server**: http://localhost:9000
- **API Gateway**: http://localhost:8080
- **Admin Service**: http://localhost:8083
- **User Service**: http://localhost:8084
- **Redis**: localhost:6379

## Service Dependencies

The services start in the following order:

1. **Redis** - No dependencies
2. **Auth Server** - Depends on Redis
3. **API Gateway** - Depends on Redis and Auth Server
4. **Admin Service** - Depends on API Gateway
5. **User Service** - Depends on API Gateway
6. **OAuth UI** - Depends on API Gateway and Auth Server

## Health Checks

All services include health checks that verify the service is running properly:

- **Redis**: `redis-cli ping`
- **Spring Boot Services**: `curl -f http://localhost:PORT/actuator/health`
- **React UI**: `curl -f http://localhost:3000/health`

## Environment Variables

### Auth Server
- `SPRING_PROFILES_ACTIVE=docker`
- `SPRING_DATA_REDIS_HOST=redis`
- `SPRING_DATA_REDIS_PORT=6379`
- `SERVER_PORT=9000`

### API Gateway
- `SPRING_PROFILES_ACTIVE=docker`
- `SPRING_DATA_REDIS_HOST=redis`
- `SPRING_DATA_REDIS_PORT=6379`
- `SERVER_PORT=8080`
- `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI=http://auth-server:9000`
- `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI=http://auth-server:9000/oauth2/jwks`

### Admin Service
- `SPRING_PROFILES_ACTIVE=docker`
- `SERVER_PORT=8083`

### User Service
- `SPRING_PROFILES_ACTIVE=docker`
- `SERVER_PORT=8084`

### OAuth UI
- `REACT_APP_API_BASE_URL=http://localhost:3000`

## Network Configuration

All services run on a custom Docker network `oauth-network` with subnet `172.20.0.0/16`.

## Volumes

- `redis_data`: Persistent Redis data storage

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check if ports are in use
   netstat -an | findstr :3000
   netstat -an | findstr :8080
   netstat -an | findstr :9000
   ```

2. **Service Not Starting**
   ```bash
   # Check service logs
   docker-compose logs [service-name]
   
   # Restart specific service
   docker-compose restart [service-name]
   ```

3. **Build Failures**
   ```bash
   # Clean and rebuild
   docker-compose down
   docker system prune -f
   docker-compose up --build
   ```

4. **Memory Issues**
   ```bash
   # Increase Docker memory limit in Docker Desktop settings
   # Recommended: 4GB minimum
   ```

### Debugging Commands

```bash
# Enter a running container
docker-compose exec auth-server sh
docker-compose exec api-gateway sh
docker-compose exec oauth-ui sh

# View real-time logs
docker-compose logs -f [service-name]

# Check service health
curl http://localhost:9000/actuator/health
curl http://localhost:8080/actuator/health
curl http://localhost:8083/actuator/health
curl http://localhost:8084/actuator/health
```

## Development Workflow

### 1. Start Services for Development

```bash
# Start only backend services
docker-compose up redis auth-server api-gateway admin-service user-service

# Run frontend locally for development
cd oauth-ui
npm start
```

### 2. Rebuild Specific Service

```bash
# Rebuild and restart specific service
docker-compose up --build auth-server

# Rebuild without cache
docker-compose build --no-cache auth-server
```

### 3. Update Configuration

After changing configuration files, rebuild the affected service:

```bash
docker-compose up --build [service-name]
```

## Production Deployment

### 1. Environment-Specific Configuration

Create environment-specific docker-compose files:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### 2. Security Considerations

- Use secrets management for sensitive data
- Enable HTTPS/TLS in production
- Configure proper firewall rules
- Use production-grade Redis configuration
- Implement proper logging and monitoring

### 3. Scaling

```bash
# Scale specific services
docker-compose up --scale admin-service=2 --scale user-service=2
```

## Cleanup

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove all containers, networks, and images
docker-compose down --rmi all --volumes --remove-orphans
```

## Monitoring

### 1. Service Health

```bash
# Check all service health
docker-compose ps

# View resource usage
docker stats
```

### 2. Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific time period
docker-compose logs --since="2024-01-01T00:00:00" --until="2024-01-01T23:59:59"
```

### 3. Metrics

- **Auth Server**: http://localhost:9000/actuator/metrics
- **API Gateway**: http://localhost:8080/actuator/metrics
- **Admin Service**: http://localhost:8083/actuator/metrics
- **User Service**: http://localhost:8084/actuator/metrics

## Support

For issues and questions:

1. Check the troubleshooting section above
2. Review service logs: `docker-compose logs [service-name]`
3. Verify network connectivity between services
4. Check health endpoints for each service
5. Ensure all required ports are available 