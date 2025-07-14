#!/bin/bash

# Pokemon API Docker Setup Script

echo "🐳 Pokémon Teams API - Docker Setup"
echo "=================================="

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to build and start with SQLite (default)
start_sqlite() {
    echo "🗄️  Starting with SQLite database..."
    docker-compose up --build -d
    echo "✅ Application started!"
    echo "📱 API: http://localhost:3000"
    echo "📚 Swagger: http://localhost:3000/api"
}

# Function to start with PostgreSQL
start_postgres() {
    echo "🐘 Starting with PostgreSQL database..."
    docker-compose --profile postgres up --build -d
    echo "✅ Application started with PostgreSQL!"
    echo "📱 API: http://localhost:3000"
    echo "📚 Swagger: http://localhost:3000/api"
    echo "🗄️  PostgreSQL: localhost:5432"
}

# Function to stop services
stop_services() {
    echo "🛑 Stopping services..."
    docker-compose down
    echo "✅ Services stopped"
}

# Function to view logs
view_logs() {
    echo "📋 Viewing application logs..."
    docker-compose logs -f pokemon-api
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main menu
case "$1" in
    "start"|"")
        check_docker
        start_sqlite
        ;;
    "start-postgres")
        check_docker
        start_postgres
        ;;
    "stop")
        stop_services
        ;;
    "logs")
        view_logs
        ;;
    "cleanup")
        cleanup
        ;;
    "restart")
        stop_services
        sleep 2
        start_sqlite
        ;;
    *)
        echo "Usage: $0 {start|start-postgres|stop|logs|restart|cleanup}"
        echo ""
        echo "Commands:"
        echo "  start          - Start with SQLite (default)"
        echo "  start-postgres - Start with PostgreSQL"
        echo "  stop          - Stop all services"
        echo "  logs          - View application logs"
        echo "  restart       - Restart services"
        echo "  cleanup       - Stop and remove all containers/volumes"
        exit 1
        ;;
esac
