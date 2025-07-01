package com.api.userservice.service;

import com.api.userservice.model.UserProfile;
import com.api.userservice.model.UserDashboard;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
        overview.put("projects", 2);
        overview.put("teams", 1);
        return overview;
    }

    public Map<String, Object> getUserPermissions() {
        Map<String, Object> permissions = new HashMap<>();
        permissions.put("canEdit", true);
        permissions.put("canDelete", false);
        return permissions;
    }

    public Map<String, Object> getUserActivity() {
        Map<String, Object> activity = new HashMap<>();
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
        info.put("provider", "Spring Authorization Server");
        info.put("scopes", "openid,profile,email");
        return info;
    }
} 