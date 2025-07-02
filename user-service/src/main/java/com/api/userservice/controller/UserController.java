package com.api.userservice.controller;

import com.api.userservice.model.UserProfile;
import com.api.userservice.model.UserDashboard;
import com.api.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<UserProfile> getUserProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<UserDashboard> getUserDashboard() {
        return ResponseEntity.ok(userService.getUserDashboard());
    }

    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserOverview() {
        return ResponseEntity.ok(userService.getUserOverview());
    }

    @GetMapping("/permissions")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserPermissions() {
        return ResponseEntity.ok(userService.getUserPermissions());
    }

    @GetMapping("/activity")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserActivity() {
        return ResponseEntity.ok(userService.getUserActivity());
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> profileUpdate) {
        try {
            Map<String, Object> result = userService.updateUserProfile(profileUpdate);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/oauth/info")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getOAuthInfo() {
        return ResponseEntity.ok(userService.getOAuthInfo());
    }

    @GetMapping("/debug/auth")
    public ResponseEntity<Map<String, Object>> debugAuth() {
        Map<String, Object> debugInfo = new HashMap<>();
        
        // Get current authentication
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            debugInfo.put("authenticated", auth.isAuthenticated());
            debugInfo.put("principal", auth.getName());
            debugInfo.put("authorities", auth.getAuthorities().stream()
                .map(Object::toString)
                .toList());
            debugInfo.put("credentials", auth.getCredentials() != null ? "present" : "null");
        } else {
            debugInfo.put("authenticated", false);
            debugInfo.put("principal", "null");
            debugInfo.put("authorities", "null");
        }
        
        return ResponseEntity.ok(debugInfo);
    }

    @GetMapping("/debug/public")
    public ResponseEntity<Map<String, Object>> debugPublic() {
        Map<String, Object> debugInfo = new HashMap<>();
        debugInfo.put("message", "Public endpoint accessible");
        debugInfo.put("timestamp", System.currentTimeMillis());
        
        // Try to get authentication info even for public endpoint
        var auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && !"anonymousUser".equals(auth.getName())) {
            debugInfo.put("hasAuth", true);
            debugInfo.put("principal", auth.getName());
            debugInfo.put("authorities", auth.getAuthorities().stream()
                .map(Object::toString)
                .toList());
        } else {
            debugInfo.put("hasAuth", false);
        }
        
        return ResponseEntity.ok(debugInfo);
    }
} 