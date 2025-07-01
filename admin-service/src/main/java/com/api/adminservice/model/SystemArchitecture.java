package com.api.adminservice.model;

import java.util.List;
import java.util.Map;

public class SystemArchitecture {
    private String systemName;
    private String version;
    private List<Microservice> microservices;
    private List<Database> databases;
    private List<SecurityComponent> securityComponents;
    private Map<String, String> configuration;

    public SystemArchitecture() {
        this.systemName = "OAuth2 Demo System";
        this.version = "1.0.0";
        this.microservices = List.of(
            new Microservice("Auth Server", "8081", "OAuth2/OIDC Authorization Server", "ACTIVE"),
            new Microservice("Resource Server", "8082", "Protected Resource API", "ACTIVE"),
            new Microservice("API Gateway", "8080", "Spring Cloud Gateway", "ACTIVE"),
            new Microservice("Admin Service", "8083", "Admin Management API", "ACTIVE"),
            new Microservice("User Service", "8084", "User Management API", "ACTIVE")
        );
        this.databases = List.of(
            new Database("Redis", "6379", "Token Storage & Caching", "ACTIVE"),
            new Database("H2", "8081", "User Management", "ACTIVE")
        );
        this.securityComponents = List.of(
            new SecurityComponent("JWT Validation", "ACTIVE", "Token validation and verification"),
            new SecurityComponent("PKCE", "ACTIVE", "Proof Key for Code Exchange"),
            new SecurityComponent("RBAC", "ACTIVE", "Role-Based Access Control"),
            new SecurityComponent("Rate Limiting", "ACTIVE", "API rate limiting"),
            new SecurityComponent("CORS", "ACTIVE", "Cross-Origin Resource Sharing")
        );
        this.configuration = Map.of(
            "JWT_SECRET", "configured",
            "REDIS_URL", "redis://localhost:6379",
            "CORS_ORIGINS", "http://localhost:3000",
            "RATE_LIMIT", "100 requests/minute"
        );
    }

    // Getters and Setters
    public String getSystemName() { return systemName; }
    public void setSystemName(String systemName) { this.systemName = systemName; }
    
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    
    public List<Microservice> getMicroservices() { return microservices; }
    public void setMicroservices(List<Microservice> microservices) { this.microservices = microservices; }
    
    public List<Database> getDatabases() { return databases; }
    public void setDatabases(List<Database> databases) { this.databases = databases; }
    
    public List<SecurityComponent> getSecurityComponents() { return securityComponents; }
    public void setSecurityComponents(List<SecurityComponent> securityComponents) { this.securityComponents = securityComponents; }
    
    public Map<String, String> getConfiguration() { return configuration; }
    public void setConfiguration(Map<String, String> configuration) { this.configuration = configuration; }

    // Inner classes
    public static class Microservice {
        private String name;
        private String port;
        private String description;
        private String status;

        public Microservice(String name, String port, String description, String status) {
            this.name = name;
            this.port = port;
            this.description = description;
            this.status = status;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getPort() { return port; }
        public void setPort(String port) { this.port = port; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class Database {
        private String name;
        private String port;
        private String purpose;
        private String status;

        public Database(String name, String port, String purpose, String status) {
            this.name = name;
            this.port = port;
            this.purpose = purpose;
            this.status = status;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getPort() { return port; }
        public void setPort(String port) { this.port = port; }
        
        public String getPurpose() { return purpose; }
        public void setPurpose(String purpose) { this.purpose = purpose; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }

    public static class SecurityComponent {
        private String name;
        private String status;
        private String description;

        public SecurityComponent(String name, String status, String description) {
            this.name = name;
            this.status = status;
            this.description = description;
        }

        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
} 