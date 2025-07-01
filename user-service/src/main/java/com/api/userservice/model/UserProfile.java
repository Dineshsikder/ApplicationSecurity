package com.api.userservice.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class UserProfile {
    private Long userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String status;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private List<String> permissions;
    private Map<String, Object> preferences;

    public UserProfile() {
        this.userId = 1L;
        this.username = "demo_user";
        this.email = "user@example.com";
        this.firstName = "Demo";
        this.lastName = "User";
        this.role = "USER";
        this.status = "ACTIVE";
        this.lastLogin = LocalDateTime.now();
        this.createdAt = LocalDateTime.now().minusDays(30);
        this.permissions = List.of("READ_PROFILE", "UPDATE_PROFILE", "VIEW_DASHBOARD");
        this.preferences = Map.of(
            "theme", "light",
            "language", "en",
            "notifications", true,
            "timezone", "UTC"
        );
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public List<String> getPermissions() { return permissions; }
    public void setPermissions(List<String> permissions) { this.permissions = permissions; }
    
    public Map<String, Object> getPreferences() { return preferences; }
    public void setPreferences(Map<String, Object> preferences) { this.preferences = preferences; }
} 