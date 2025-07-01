package com.oauth.auth_server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String BLACKLIST_PREFIX = "blacklist:";
    private static final String SESSION_PREFIX = "session:";
    private static final String JTI_PREFIX = "jti:";

    /**
     * Blacklist a JWT token by its JTI (JWT ID)
     */
    public void blacklistToken(String jti, Duration ttl) {
        String key = BLACKLIST_PREFIX + jti;
        redisTemplate.opsForValue().set(key, "revoked", ttl.toSeconds(), TimeUnit.SECONDS);
    }

    /**
     * Check if a token is blacklisted
     */
    public boolean isTokenBlacklisted(String jti) {
        String key = BLACKLIST_PREFIX + jti;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    /**
     * Store session information
     */
    public void storeSession(String sessionId, String userId, Duration ttl) {
        String key = SESSION_PREFIX + sessionId;
        redisTemplate.opsForValue().set(key, userId, ttl.toSeconds(), TimeUnit.SECONDS);
    }

    /**
     * Invalidate a session
     */
    public void invalidateSession(String sessionId) {
        String key = SESSION_PREFIX + sessionId;
        redisTemplate.delete(key);
    }

    /**
     * Check if session is valid
     */
    public boolean isSessionValid(String sessionId) {
        String key = SESSION_PREFIX + sessionId;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    /**
     * Store JTI for a user to track active tokens
     */
    public void storeUserJti(String userId, String jti, Duration ttl) {
        String key = JTI_PREFIX + userId + ":" + jti;
        redisTemplate.opsForValue().set(key, "active", ttl.toSeconds(), TimeUnit.SECONDS);
    }

    /**
     * Revoke all tokens for a user
     */
    public void revokeAllUserTokens(String userId) {
        // This is a simplified implementation
        // In production, you might want to use Redis SCAN to find all keys for a user
        String pattern = JTI_PREFIX + userId + ":*";
        // Note: Redis SCAN would be used here in a real implementation
    }

    /**
     * Clean up expired entries (can be called by a scheduled task)
     */
    public void cleanupExpiredEntries() {
        // Redis automatically expires keys, but you can add custom cleanup logic here
    }
} 