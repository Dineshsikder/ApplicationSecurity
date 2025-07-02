#!/bin/bash

# OAuth2 System Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=== $1 ===${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_status "Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    if ! docker-compose version > /dev/null 2>&1; then
        print_error "Docker Compose is not available. Please install Docker Compose and try again."
        exit 1
    fi
    print_status "Docker Compose is available"
}

# Function to build and start all services
start_all() {
    print_header "Starting OAuth2 System"
    check_docker
    check_docker_compose
    
    print_status "Building and starting all services..."
    docker-compose up --build -d
    
    print_status "Waiting for services to be ready..."
    sleep 30
    
    print_status "Checking service health..."
    check_health
    
    print_status "OAuth2 System is ready!"
    print_status "Frontend: http://localhost:3000"
    print_status "Auth Server: http://localhost:9000"
    print_status "API Gateway: http://localhost:8080"
}

# Function to stop all services
stop_all() {
    print_header "Stopping OAuth2 System"
    print_status "Stopping all services..."
    docker-compose down
    print_status "All services stopped"
}

# Function to restart all services
restart_all() {
    print_header "Restarting OAuth2 System"
    stop_all
    start_all
}

# Function to check service health
check_health() {
    print_header "Service Health Check"
    
    services=(
        "redis:6379"
        "auth-server:9000"
        "api-gateway:8080"
        "admin-service:8083"
        "user-service:8084"
        "oauth-ui:3000"
    )
    
    for service in "${services[@]}"; do
        IFS=':' read -r name port <<< "$service"
        if curl -f "http://localhost:$port/actuator/health" > /dev/null 2>&1 || curl -f "http://localhost:$port/health" > /dev/null 2>&1; then
            print_status "$name is healthy"
        else
            print_warning "$name health check failed"
        fi
    done
}

# Function to view logs
view_logs() {
    if [ -z "$1" ]; then
        print_header "All Service Logs"
        docker-compose logs -f
    else
        print_header "Logs for $1"
        docker-compose logs -f "$1"
    fi
}

# Function to rebuild specific service
rebuild_service() {
    if [ -z "$1" ]; then
        print_error "Please specify a service name"
        echo "Available services: redis, auth-server, api-gateway, admin-service, user-service, oauth-ui"
        exit 1
    fi
    
    print_header "Rebuilding $1"
    docker-compose up --build -d "$1"
    print_status "$1 rebuilt and restarted"
}

# Function to clean up everything
cleanup() {
    print_header "Cleaning Up OAuth2 System"
    print_warning "This will remove all containers, networks, volumes, and images"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Stopping and removing all containers..."
        docker-compose down --rmi all --volumes --remove-orphans
        print_status "Cleanup completed"
    else
        print_status "Cleanup cancelled"
    fi
}

# Function to show status
show_status() {
    print_header "OAuth2 System Status"
    docker-compose ps
    
    echo
    print_header "Resource Usage"
    docker stats --no-stream
}

# Function to show help
show_help() {
    echo "OAuth2 System Docker Management Script"
    echo
    echo "Usage: $0 [COMMAND]"
    echo
    echo "Commands:"
    echo "  start       Build and start all services"
    echo "  stop        Stop all services"
    echo "  restart     Restart all services"
    echo "  status      Show service status and resource usage"
    echo "  health      Check service health"
    echo "  logs [SERVICE]  View logs (all services or specific service)"
    echo "  rebuild [SERVICE]  Rebuild and restart specific service"
    echo "  cleanup     Remove all containers, networks, volumes, and images"
    echo "  help        Show this help message"
    echo
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 logs auth-server"
    echo "  $0 rebuild api-gateway"
    echo "  $0 health"
}

# Main script logic
case "${1:-help}" in
    start)
        start_all
        ;;
    stop)
        stop_all
        ;;
    restart)
        restart_all
        ;;
    status)
        show_status
        ;;
    health)
        check_health
        ;;
    logs)
        view_logs "$2"
        ;;
    rebuild)
        rebuild_service "$2"
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo
        show_help
        exit 1
        ;;
esac 