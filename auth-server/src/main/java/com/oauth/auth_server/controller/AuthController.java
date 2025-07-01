package com.oauth.auth_server.controller;

import com.oauth.auth_server.model.User;
import com.oauth.auth_server.service.UserService;
import com.oauth.auth_server.service.TokenBlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            // Check if user already exists
            if (userService.findByUsername(user.getUsername()) != null) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Username already exists");
                return ResponseEntity.badRequest().body(response);
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // Set default role as USER
            user.setRole("USER");
            
            User savedUser = userService.saveUser(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("userId", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("role", savedUser.getRole());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");

            User user = userService.findByUsername(username);
            
            if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Invalid username or password");
                return ResponseEntity.badRequest().body(response);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            response.put("email", user.getEmail());
            response.put("firstName", user.getFirstName());
            response.put("lastName", user.getLastName());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestBody Map<String, String> logoutRequest) {
        try {
            String token = logoutRequest.get("token");
            String userId = logoutRequest.get("userId");
            
            // Add token to blacklist
            if (token != null) {
                String jti = extractJtiFromToken(token);
                if (jti != null) {
                    tokenBlacklistService.blacklistToken(jti, java.time.Duration.ofHours(1));
                }
            }
            
            // Revoke refresh tokens for the user
            if (userId != null) {
                tokenBlacklistService.revokeAllUserTokens(userId);
            }
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Logout successful");
            response.put("status", "logged_out");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Logout failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    private String extractJtiFromToken(String token) {
        // This is a simplified implementation
        // In production, you would properly decode the JWT to extract the JTI
        // For now, we'll use a placeholder
        return "jti-" + token.hashCode();
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to fetch users: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> roleRequest) {
        try {
            String newRole = roleRequest.get("role");
            if (!"ADMIN".equals(newRole) && !"USER".equals(newRole)) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Invalid role. Must be ADMIN or USER");
                return ResponseEntity.badRequest().body(response);
            }

            User updatedUser = userService.updateUserRole(userId, newRole);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User role updated successfully");
            response.put("userId", updatedUser.getId());
            response.put("username", updatedUser.getUsername());
            response.put("role", updatedUser.getRole());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Failed to update user role: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 