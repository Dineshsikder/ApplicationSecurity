package com.api.adminservice.controller;

import com.api.adminservice.model.SystemArchitecture;
import com.api.adminservice.model.SystemMetrics;
import com.api.adminservice.model.UserManagement;
import com.api.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/architecture")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemArchitecture> getSystemArchitecture() {
        return ResponseEntity.ok(adminService.getSystemArchitecture());
    }

    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemMetrics> getSystemMetrics() {
        return ResponseEntity.ok(adminService.getSystemMetrics());
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserManagement> getUserManagement() {
        return ResponseEntity.ok(adminService.getUserManagement());
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("architecture", adminService.getSystemArchitecture());
        dashboard.put("metrics", adminService.getSystemMetrics());
        dashboard.put("userManagement", adminService.getUserManagement());
        dashboard.put("securityStatus", adminService.getSecurityStatus());
        dashboard.put("systemHealth", adminService.getSystemHealth());
        return ResponseEntity.ok(dashboard);
    }

    @PostMapping("/users/{userId}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long userId, @RequestBody Map<String, String> roleRequest) {
        try {
            String newRole = roleRequest.get("role");
            Map<String, Object> result = adminService.updateUserRole(userId, newRole);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/security/audit")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getSecurityAudit() {
        return ResponseEntity.ok(adminService.getSecurityAudit());
    }

    @GetMapping("/system/health")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getSystemHealth() {
        return ResponseEntity.ok(adminService.getSystemHealth());
    }

    @GetMapping("/oauth/configuration")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getOAuthConfiguration() {
        return ResponseEntity.ok(adminService.getOAuthConfiguration());
    }
} 