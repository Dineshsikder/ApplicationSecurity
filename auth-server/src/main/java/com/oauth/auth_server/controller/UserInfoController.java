package com.oauth.auth_server.controller;

import com.oauth.auth_server.model.User;
import com.oauth.auth_server.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfoController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);
    
    @Autowired
    private UserRepository userRepository;

    // @GetMapping("/userinfo")
    // public User userInfo(@AuthenticationPrincipal UserDetails userDetails) {
    //     // Fetch user from DB using username
    //     return userRepository.findByUsername(userDetails.getUsername())
    //             .orElse(null);
    // }

    @GetMapping("/userinfo")
    public Map<String, Object> userInfo(@AuthenticationPrincipal Jwt jwt) {
        logger.info("=== /userinfo endpoint called ===");
        logger.info("JWT Subject: {}", jwt.getSubject());
        logger.info("JWT Username claim: {}", jwt.getClaimAsString("username"));
        logger.info("JWT Role claim: {}", jwt.getClaimAsString("role"));
        logger.info("JWT All claims: {}", jwt.getClaims());
        
        Map<String, Object> userInfo = new HashMap<>();
        
        // Extract claims from JWT
        String subject = jwt.getSubject();
        String username = jwt.getClaimAsString("username");
        
        logger.info("Looking up user by username: {}", username);
        
        // Try to find user by username first, then by subject
        User user = null;
        if (username != null) {
            user = userRepository.findByUsername(username).orElse(null);
            logger.info("User found by username '{}': {}", username, user != null);
        }
        
        // If not found by username, try by subject (which might be the username)
        if (user == null && subject != null) {
            logger.info("User not found by username, trying subject: {}", subject);
            user = userRepository.findByUsername(subject).orElse(null);
            logger.info("User found by subject '{}': {}", subject, user != null);
        }
        
        if (user != null) {
            logger.info("Returning user info from database for user: {}", user.getUsername());
            userInfo.put("sub", user.getId());
            userInfo.put("username", user.getUsername());
            userInfo.put("email", user.getEmail());
            userInfo.put("firstName", user.getFirstName());
            userInfo.put("lastName", user.getLastName());
            userInfo.put("role", user.getRole());
        } else {
            logger.warn("User not found in database, returning JWT claims only");
            // Fallback to JWT claims if user not found in DB
            userInfo.put("sub", subject);
            userInfo.put("username", username != null ? username : subject);
            userInfo.put("role", jwt.getClaimAsString("role"));
            userInfo.put("email", jwt.getClaimAsString("email"));
            userInfo.put("firstName", jwt.getClaimAsString("firstName"));
            userInfo.put("lastName", jwt.getClaimAsString("lastName"));
        }
        
        logger.info("Returning user info: {}", userInfo);
        return userInfo;
    }

    @GetMapping("/test")
    public Map<String, Object> test() {
        logger.info("=== /test endpoint called ===");
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Test endpoint working");
        response.put("timestamp", System.currentTimeMillis());
        logger.info("Test endpoint response: {}", response);
        return response;
    }
} 