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
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserProfile> getUserProfile() {
        return ResponseEntity.ok(userService.getUserProfile());
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserDashboard> getUserDashboard() {
        return ResponseEntity.ok(userService.getUserDashboard());
    }

    @GetMapping("/overview")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserOverview() {
        return ResponseEntity.ok(userService.getUserOverview());
    }

    @GetMapping("/permissions")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserPermissions() {
        return ResponseEntity.ok(userService.getUserPermissions());
    }

    @GetMapping("/activity")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserActivity() {
        return ResponseEntity.ok(userService.getUserActivity());
    }

    @PutMapping("/profile")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
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
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getOAuthInfo() {
        return ResponseEntity.ok(userService.getOAuthInfo());
    }
} 