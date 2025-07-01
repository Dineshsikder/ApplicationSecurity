package com.api.userservice.model;

public class UserDashboard {
    private int notifications;
    private int tasks;
    private String welcomeMessage;

    public UserDashboard() {}

    public UserDashboard(int notifications, int tasks, String welcomeMessage) {
        this.notifications = notifications;
        this.tasks = tasks;
        this.welcomeMessage = welcomeMessage;
    }

    public int getNotifications() { return notifications; }
    public void setNotifications(int notifications) { this.notifications = notifications; }

    public int getTasks() { return tasks; }
    public void setTasks(int tasks) { this.tasks = tasks; }

    public String getWelcomeMessage() { return welcomeMessage; }
    public void setWelcomeMessage(String welcomeMessage) { this.welcomeMessage = welcomeMessage; }
} 