package com.api.userservice.service;

import com.api.userservice.model.UserProfile;
import com.api.userservice.model.UserDashboard;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    public UserProfile getUserProfile() {
        return new UserProfile();
    }

    public UserDashboard getUserDashboard() {
        return new UserDashboard(5, 3, "Welcome back, John!");
    }

    public Map<String, Object> getUserOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("loginCount", 15);
        overview.put("sessionDuration", "2 hours 30 minutes");
        overview.put("projects", 2);
        overview.put("teams", 1);
        return overview;
    }

    public Map<String, Object> getUserPermissions() {
        Map<String, Object> permissions = new HashMap<>();
        
        // Create permissions array as expected by frontend
        List<Map<String, Object>> permissionsList = new ArrayList<>();
        
        Map<String, Object> permission1 = new HashMap<>();
        permission1.put("name", "Read Profile");
        permission1.put("description", "Can view user profile information");
        permission1.put("status", "ACTIVE");
        permissionsList.add(permission1);
        
        Map<String, Object> permission2 = new HashMap<>();
        permission2.put("name", "Update Profile");
        permission2.put("description", "Can modify user profile information");
        permission2.put("status", "ACTIVE");
        permissionsList.add(permission2);
        
        Map<String, Object> permission3 = new HashMap<>();
        permission3.put("name", "View Dashboard");
        permission3.put("description", "Can access user dashboard");
        permission3.put("status", "ACTIVE");
        permissionsList.add(permission3);
        
        permissions.put("permissions", permissionsList);
        permissions.put("canEdit", true);
        permissions.put("canDelete", false);
        return permissions;
    }

    public Map<String, Object> getUserActivity() {
        Map<String, Object> activity = new HashMap<>();
        
        // Create recent activity array as expected by frontend
        List<Map<String, Object>> recentActivity = new ArrayList<>();
        
        Map<String, Object> activity1 = new HashMap<>();
        activity1.put("timestamp", LocalDateTime.now().minusHours(2).toString());
        activity1.put("action", "Profile Updated");
        activity1.put("description", "User profile information was modified");
        activity1.put("status", "SUCCESS");
        recentActivity.add(activity1);
        
        Map<String, Object> activity2 = new HashMap<>();
        activity2.put("timestamp", LocalDateTime.now().minusDays(1).toString());
        activity2.put("action", "Login");
        activity2.put("description", "User logged in successfully");
        activity2.put("status", "SUCCESS");
        recentActivity.add(activity2);
        
        Map<String, Object> activity3 = new HashMap<>();
        activity3.put("timestamp", LocalDateTime.now().minusDays(2).toString());
        activity3.put("action", "Password Changed");
        activity3.put("description", "User password was updated");
        activity3.put("status", "SUCCESS");
        recentActivity.add(activity3);
        
        activity.put("recentActivity", recentActivity);
        activity.put("lastLogin", "2024-06-01T10:00:00Z");
        activity.put("actions", 12);
        return activity;
    }

    public Map<String, Object> updateUserProfile(Map<String, String> profileUpdate) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "updated");
        result.putAll(profileUpdate);
        return result;
    }

    public Map<String, Object> getOAuthInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("sessionId", "session_12345");
        info.put("clientId", "web-client");
        info.put("provider", "Spring Authorization Server");
        info.put("scopes", "openid,profile,email");
        return info;
    }
} 