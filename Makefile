# OAuth2 System Docker Management Makefile

.PHONY: help start stop restart status health logs rebuild cleanup clean

# Default target
help: ## Show this help message
	@echo "OAuth2 System Docker Management"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

start: ## Build and start all services
	@echo "🚀 Starting OAuth2 System..."
	docker-compose up --build -d
	@echo "⏳ Waiting for services to be ready..."
	@sleep 30
	@echo "🔍 Checking service health..."
	@make health
	@echo "✅ OAuth2 System is ready!"
	@echo "   Frontend: http://localhost:3000"
	@echo "   Auth Server: http://localhost:9000"
	@echo "   API Gateway: http://localhost:8080"

stop: ## Stop all services
	@echo "🛑 Stopping OAuth2 System..."
	docker-compose down
	@echo "✅ All services stopped"

restart: ## Restart all services
	@echo "🔄 Restarting OAuth2 System..."
	@make stop
	@make start

status: ## Show service status and resource usage
	@echo "📊 OAuth2 System Status"
	docker-compose ps
	@echo ""
	@echo "💻 Resource Usage"
	docker stats --no-stream

health: ## Check service health
	@echo "🏥 Service Health Check"
	@for service in redis:6379 auth-server:9000 api-gateway:8080 admin-service:8083 user-service:8084 oauth-ui:3000; do \
		IFS=':' read -r name port <<< "$$service"; \
		if curl -f "http://localhost:$$port/actuator/health" > /dev/null 2>&1 || curl -f "http://localhost:$$port/health" > /dev/null 2>&1; then \
			echo "✅ $$name is healthy"; \
		else \
			echo "⚠️  $$name health check failed"; \
		fi; \
	done

logs: ## View logs for all services
	@echo "📋 Viewing all service logs..."
	docker-compose logs -f

logs-auth: ## View auth server logs
	@echo "📋 Viewing auth server logs..."
	docker-compose logs -f auth-server

logs-gateway: ## View API gateway logs
	@echo "📋 Viewing API gateway logs..."
	docker-compose logs -f api-gateway

logs-admin: ## View admin service logs
	@echo "📋 Viewing admin service logs..."
	docker-compose logs -f admin-service

logs-user: ## View user service logs
	@echo "📋 Viewing user service logs..."
	docker-compose logs -f user-service

logs-ui: ## View UI logs
	@echo "📋 Viewing UI logs..."
	docker-compose logs -f oauth-ui

rebuild: ## Rebuild all services
	@echo "🔨 Rebuilding all services..."
	docker-compose up --build -d
	@echo "✅ All services rebuilt"

rebuild-auth: ## Rebuild auth server
	@echo "🔨 Rebuilding auth server..."
	docker-compose up --build -d auth-server

rebuild-gateway: ## Rebuild API gateway
	@echo "🔨 Rebuilding API gateway..."
	docker-compose up --build -d api-gateway

rebuild-admin: ## Rebuild admin service
	@echo "🔨 Rebuilding admin service..."
	docker-compose up --build -d admin-service

rebuild-user: ## Rebuild user service
	@echo "🔨 Rebuilding user service..."
	docker-compose up --build -d user-service

rebuild-ui: ## Rebuild UI
	@echo "🔨 Rebuilding UI..."
	docker-compose up --build -d oauth-ui

cleanup: ## Remove all containers, networks, volumes, and images
	@echo "🧹 Cleaning up OAuth2 System..."
	@echo "⚠️  This will remove all containers, networks, volumes, and images"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	docker-compose down --rmi all --volumes --remove-orphans
	@echo "✅ Cleanup completed"

clean: ## Clean up containers and networks (keep volumes and images)
	@echo "🧹 Cleaning up containers and networks..."
	docker-compose down
	@echo "✅ Cleanup completed"

# Development targets
dev-backend: ## Start only backend services for development
	@echo "🔧 Starting backend services for development..."
	docker-compose up -d redis auth-server api-gateway admin-service user-service
	@echo "✅ Backend services ready"
	@echo "   Frontend should be run locally with: cd oauth-ui && npm start"

dev-logs: ## View logs for backend services only
	@echo "📋 Viewing backend service logs..."
	docker-compose logs -f redis auth-server api-gateway admin-service user-service

# Utility targets
shell-auth: ## Open shell in auth server container
	docker-compose exec auth-server sh

shell-gateway: ## Open shell in API gateway container
	docker-compose exec api-gateway sh

shell-admin: ## Open shell in admin service container
	docker-compose exec admin-service sh

shell-user: ## Open shell in user service container
	docker-compose exec user-service sh

shell-ui: ## Open shell in UI container
	docker-compose exec oauth-ui sh

# Network targets
network-info: ## Show network information
	@echo "🌐 Network Information"
	docker network ls | grep oauth
	docker network inspect oauth-network 2>/dev/null || echo "Network not found"

# Volume targets
volume-info: ## Show volume information
	@echo "💾 Volume Information"
	docker volume ls | grep oauth
	docker volume inspect oauth_redis_data 2>/dev/null || echo "Volume not found"

# Monitoring targets
monitor: ## Monitor all services in real-time
	@echo "📊 Monitoring all services..."
	docker-compose ps
	@echo ""
	docker stats

# Backup and restore targets
backup: ## Backup Redis data
	@echo "💾 Backing up Redis data..."
	docker-compose exec redis redis-cli BGSAVE
	@echo "✅ Redis backup completed"

restore: ## Restore Redis data (requires backup file)
	@echo "📥 Restoring Redis data..."
	@echo "⚠️  This will overwrite current data"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "Please place your backup file in the project root and update this target"
	@echo "✅ Restore completed" 