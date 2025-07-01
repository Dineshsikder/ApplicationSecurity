package com.api.apigateway.service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URL;
import java.text.ParseException;
import java.util.Map;

@Service
public class JwtValidationService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private WebClient webClient;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    private static final String BLACKLIST_PREFIX = "blacklist:";
    private static final String INTROSPECTION_PREFIX = "introspection:";

    /**
     * Validate JWT token against the authorization server
     */
    public Mono<JWTValidationResult> validateToken(String token) {
        return Mono.fromCallable(() -> {
            try {
                // 1. Check if token is blacklisted
                if (isTokenBlacklisted(token)) {
                    return new JWTValidationResult(false, "Token has been revoked", null, null);
                }

                // 2. Validate JWT signature and claims
                JWTClaimsSet claimsSet = validateJwtSignature(token);
                if (claimsSet == null) {
                    return new JWTValidationResult(false, "Invalid JWT signature", null, null);
                }

                // 3. Validate token with authorization server (introspection)
                return validateWithAuthServer(token, claimsSet);

            } catch (Exception e) {
                return new JWTValidationResult(false, "Token validation failed: " + e.getMessage(), null, null);
            }
        });
    }

    /**
     * Validate JWT signature using JWK from auth server
     */
    private JWTClaimsSet validateJwtSignature(String token) {
        try {
            // Fetch JWK set from auth server
            JWKSet jwkSet = JWKSet.load(new URL(jwkSetUri));
            JWKSource<SecurityContext> jwkSource = (jwkSelector, context) -> jwkSelector.select(jwkSet);

            // Configure JWT processor
            ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
            JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
            jwtProcessor.setJWSKeySelector(keySelector);

            // Process and validate JWT
            SecurityContext context = null;
            JWTClaimsSet claimsSet = jwtProcessor.process(token, context);

            // Validate issuer
            if (!issuerUri.equals(claimsSet.getIssuer())) {
                return null;
            }

            // Validate expiration
            if (claimsSet.getExpirationTime() != null && 
                claimsSet.getExpirationTime().before(new java.util.Date())) {
                return null;
            }

            return claimsSet;

        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Validate token with authorization server using introspection endpoint
     */
    private JWTValidationResult validateWithAuthServer(String token, JWTClaimsSet claimsSet) {
        try {
            // Check cache first
            String cacheKey = INTROSPECTION_PREFIX + token.hashCode();
            Boolean cachedResult = (Boolean) redisTemplate.opsForValue().get(cacheKey);
            if (cachedResult != null) {
                if (cachedResult) {
                    return new JWTValidationResult(true, "Token is valid", claimsSet, extractAuthorities(claimsSet));
                } else {
                    return new JWTValidationResult(false, "Token is invalid", null, null);
                }
            }

            // Call auth server introspection endpoint
            String introspectionUrl = issuerUri + "/oauth2/introspect";
            
            Map<String, Object> response = webClient.post()
                .uri(introspectionUrl)
                .header("Authorization", "Bearer " + token)
                .bodyValue(Map.of("token", token))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            if (response != null && Boolean.TRUE.equals(response.get("active"))) {
                // Cache positive result for 5 minutes
                redisTemplate.opsForValue().set(cacheKey, true, java.time.Duration.ofMinutes(5));
                return new JWTValidationResult(true, "Token is valid", claimsSet, extractAuthorities(claimsSet));
            } else {
                // Cache negative result for 1 minute
                redisTemplate.opsForValue().set(cacheKey, false, java.time.Duration.ofMinutes(1));
                return new JWTValidationResult(false, "Token is invalid", null, null);
            }

        } catch (Exception e) {
            // Fallback to JWT validation only if introspection fails
            return new JWTValidationResult(true, "Token validated (introspection unavailable)", claimsSet, extractAuthorities(claimsSet));
        }
    }

    /**
     * Check if token is blacklisted
     */
    private boolean isTokenBlacklisted(String token) {
        String jti = extractJtiFromToken(token);
        String key = BLACKLIST_PREFIX + jti;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    /**
     * Extract JTI from token
     */
    private String extractJtiFromToken(String token) {
        try {
            JWTClaimsSet claimsSet = JWTClaimsSet.parse(token);
            return claimsSet.getJWTID();
        } catch (ParseException e) {
            return "jti-" + token.hashCode();
        }
    }

    /**
     * Extract authorities from JWT claims
     */
    private java.util.List<String> extractAuthorities(JWTClaimsSet claimsSet) {
        try {
            Object authorities = claimsSet.getClaim("authorities");
            if (authorities instanceof java.util.List) {
                return (java.util.List<String>) authorities;
            }
        } catch (Exception e) {
            // Ignore
        }
        return java.util.List.of();
    }

    /**
     * Blacklist a token
     */
    public void blacklistToken(String token) {
        String jti = extractJtiFromToken(token);
        String key = BLACKLIST_PREFIX + jti;
        redisTemplate.opsForValue().set(key, true, java.time.Duration.ofDays(1));
    }

    /**
     * Result of JWT validation
     */
    public static class JWTValidationResult {
        private final boolean valid;
        private final String message;
        private final JWTClaimsSet claimsSet;
        private final java.util.List<String> authorities;

        public JWTValidationResult(boolean valid, String message, JWTClaimsSet claimsSet, java.util.List<String> authorities) {
            this.valid = valid;
            this.message = message;
            this.claimsSet = claimsSet;
            this.authorities = authorities;
        }

        public boolean isValid() { return valid; }
        public String getMessage() { return message; }
        public JWTClaimsSet getClaimsSet() { return claimsSet; }
        public java.util.List<String> getAuthorities() { return authorities; }
    }
} 