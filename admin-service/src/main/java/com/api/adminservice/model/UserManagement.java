package com.api.adminservice.model;

import java.util.List;

public class UserManagement {
    private int totalUsers;
    private int activeUsers;
    private List<String> adminUsernames;

    public UserManagement() {}

    public UserManagement(int totalUsers, int activeUsers, List<String> adminUsernames) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.adminUsernames = adminUsernames;
    }

    public int getTotalUsers() { return totalUsers; }
    public void setTotalUsers(int totalUsers) { this.totalUsers = totalUsers; }

    public int getActiveUsers() { return activeUsers; }
    public void setActiveUsers(int activeUsers) { this.activeUsers = activeUsers; }

    public List<String> getAdminUsernames() { return adminUsernames; }
    public void setAdminUsernames(List<String> adminUsernames) { this.adminUsernames = adminUsernames; }
} 