@echo off
setlocal enabledelayedexpansion

REM OAuth2 System Docker Management Script for Windows

set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
:print_status
echo %GREEN%[INFO]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %BLUE%=== %~1 ===%NC%
goto :eof

REM Function to check if Docker is running
:check_docker
docker info >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker is not running. Please start Docker and try again."
    exit /b 1
)
call :print_status "Docker is running"
goto :eof

REM Function to check if Docker Compose is available
:check_docker_compose
docker-compose version >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker Compose is not available. Please install Docker Compose and try again."
    exit /b 1
)
call :print_status "Docker Compose is available"
goto :eof

REM Function to build and start all services
:start_all
call :print_header "Starting OAuth2 System"
call :check_docker
if errorlevel 1 exit /b 1
call :check_docker_compose
if errorlevel 1 exit /b 1

call :print_status "Building and starting all services..."
docker-compose up --build -d

call :print_status "Waiting for services to be ready..."
timeout /t 30 /nobreak >nul

call :print_status "Checking service health..."
call :check_health

call :print_status "OAuth2 System is ready!"
call :print_status "Frontend: http://localhost:3000"
call :print_status "Auth Server: http://localhost:9000"
call :print_status "API Gateway: http://localhost:8080"
goto :eof

REM Function to stop all services
:stop_all
call :print_header "Stopping OAuth2 System"
call :print_status "Stopping all services..."
docker-compose down
call :print_status "All services stopped"
goto :eof

REM Function to restart all services
:restart_all
call :print_header "Restarting OAuth2 System"
call :stop_all
call :start_all
goto :eof

REM Function to check service health
:check_health
call :print_header "Service Health Check"

set "services=redis:6379 auth-server:9000 api-gateway:8080 admin-service:8083 user-service:8084 oauth-ui:3000"

for %%s in (%services%) do (
    for /f "tokens=1,2 delims=:" %%a in ("%%s") do (
        set "name=%%a"
        set "port=%%b"
        
        curl -f "http://localhost:!port!/actuator/health" >nul 2>&1
        if !errorlevel! equ 0 (
            call :print_status "!name! is healthy"
        ) else (
            curl -f "http://localhost:!port!/health" >nul 2>&1
            if !errorlevel! equ 0 (
                call :print_status "!name! is healthy"
            ) else (
                call :print_warning "!name! health check failed"
            )
        )
    )
)
goto :eof

REM Function to view logs
:view_logs
if "%~1"=="" (
    call :print_header "All Service Logs"
    docker-compose logs -f
) else (
    call :print_header "Logs for %~1"
    docker-compose logs -f "%~1"
)
goto :eof

REM Function to rebuild specific service
:rebuild_service
if "%~1"=="" (
    call :print_error "Please specify a service name"
    echo Available services: redis, auth-server, api-gateway, admin-service, user-service, oauth-ui
    exit /b 1
)

call :print_header "Rebuilding %~1"
docker-compose up --build -d "%~1"
call :print_status "%~1 rebuilt and restarted"
goto :eof

REM Function to clean up everything
:cleanup
call :print_header "Cleaning Up OAuth2 System"
call :print_warning "This will remove all containers, networks, volumes, and images"
set /p "confirm=Are you sure? (y/N): "
if /i "!confirm!"=="y" (
    call :print_status "Stopping and removing all containers..."
    docker-compose down --rmi all --volumes --remove-orphans
    call :print_status "Cleanup completed"
) else (
    call :print_status "Cleanup cancelled"
)
goto :eof

REM Function to show status
:show_status
call :print_header "OAuth2 System Status"
docker-compose ps

echo.
call :print_header "Resource Usage"
docker stats --no-stream
goto :eof

REM Function to show help
:show_help
echo OAuth2 System Docker Management Script
echo.
echo Usage: %~nx0 [COMMAND]
echo.
echo Commands:
echo   start       Build and start all services
echo   stop        Stop all services
echo   restart     Restart all services
echo   status      Show service status and resource usage
echo   health      Check service health
echo   logs [SERVICE]  View logs (all services or specific service)
echo   rebuild [SERVICE]  Rebuild and restart specific service
echo   cleanup     Remove all containers, networks, volumes, and images
echo   help        Show this help message
echo.
echo Examples:
echo   %~nx0 start
echo   %~nx0 logs auth-server
echo   %~nx0 rebuild api-gateway
echo   %~nx0 health
goto :eof

REM Main script logic
if "%~1"=="" goto :show_help

if "%~1"=="start" goto :start_all
if "%~1"=="stop" goto :stop_all
if "%~1"=="restart" goto :restart_all
if "%~1"=="status" goto :show_status
if "%~1"=="health" goto :check_health
if "%~1"=="logs" goto :view_logs
if "%~1"=="rebuild" goto :rebuild_service
if "%~1"=="cleanup" goto :cleanup
if "%~1"=="help" goto :show_help
if "%~1"=="--help" goto :show_help
if "%~1"=="-h" goto :show_help

call :print_error "Unknown command: %~1"
echo.
call :show_help
exit /b 1 