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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.net.URL;
import java.text.ParseException;
import java.util.*;

@Service
public class JwtValidationService {

    private static final Logger logger = LoggerFactory.getLogger(JwtValidationService.class);

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;

    private static final String BLACKLIST_PREFIX = "blacklist:";

    private JWKSet cachedJwkSet;

    public JwtValidationService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Mono<JWTValidationResult> validateToken(String token) {
        return Mono.fromCallable(() -> {
            logger.info("Starting JWT validation");
            try {
                // Validate JWT signature and claims first
                JWTClaimsSet claimsSet = validateJwtSignature(token);
                if (claimsSet == null) {
                    logger.error("JWT signature or claims invalid");
                    return new JWTValidationResult(false, "Invalid JWT signature or claims", null, null);
                }

                // Extract JTI from validated claims
                String jti = claimsSet.getJWTID();
                logger.debug("Extracted JTI from validated claims: {}", jti);

                // Check blacklist using the extracted JTI
                if (isTokenBlacklisted(jti)) {
                    logger.warn("Token is blacklisted for JTI: {}", jti);
                    return new JWTValidationResult(false, "Token has been revoked", null, null);
                }

                logger.info("JWT successfully validated for subject: {}", claimsSet.getSubject());
                return new JWTValidationResult(true, "Token is valid", claimsSet, extractAuthorities(claimsSet));

            } catch (Exception e) {
                logger.error("JWT validation failed: {}", e.getMessage(), e);
                return new JWTValidationResult(false, "Token validation failed: " + e.getMessage(), null, null);
            }
        });
    }

    private JWTClaimsSet validateJwtSignature(String token) {
        try {
            logger.info("Validating JWT signature and claims");

            if (cachedJwkSet == null) {
                logger.info("Loading JWK set from URI: {}", jwkSetUri);
                cachedJwkSet = JWKSet.load(new URL(jwkSetUri));
                logger.info("JWK set loaded successfully");
            }

            JWKSource<SecurityContext> jwkSource = (jwkSelector, context) -> jwkSelector.select(cachedJwkSet);

            ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
            JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource);
            jwtProcessor.setJWSKeySelector(keySelector);

            JWTClaimsSet claimsSet = jwtProcessor.process(token, null);

            logger.debug("JWT claims: {}", claimsSet.toJSONObject());

            // Validate issuer
            if (!issuerUri.equals(claimsSet.getIssuer())) {
                logger.warn("Invalid issuer. Expected: {}, Found: {}", issuerUri, claimsSet.getIssuer());
                return null;
            }

            // Validate audience
            if (claimsSet.getAudience() == null || !claimsSet.getAudience().contains("api-gateway")) {
                logger.warn("Invalid audience. Expected to contain: api-gateway, Found: {}", claimsSet.getAudience());
                return null;
            }

            // Validate expiry
            Date expiry = claimsSet.getExpirationTime();
            if (expiry != null && expiry.before(new Date())) {
                logger.warn("Token expired at {}", expiry);
                return null;
            }

            logger.info("JWT signature and claims validation passed");
            return claimsSet;

        } catch (Exception e) {
            logger.error("Error validating JWT signature: {}", e.getMessage(), e);
            return null;
        }
    }

    private boolean isTokenBlacklisted(String jti) {
        String key = BLACKLIST_PREFIX + jti;
        boolean isBlacklisted = Boolean.TRUE.equals(redisTemplate.hasKey(key));
        logger.info("Checking blacklist for JTI {}: {}", jti, isBlacklisted);
        return isBlacklisted;
    }

    private List<String> extractAuthorities(JWTClaimsSet claimsSet) {
        try {
            Object authorities = claimsSet.getClaim("authorities");
            if (authorities instanceof List<?>) {
                logger.debug("Extracted authorities from claim");
                return ((List<?>) authorities).stream()
                        .map(Object::toString)
                        .toList();
            }

            // fallback to scopes
            Object scopes = claimsSet.getClaim("scope");
            if (scopes instanceof List<?>) {
                logger.debug("Extracted scopes as authorities from list");
                return ((List<?>) scopes).stream()
                        .map(Object::toString)
                        .toList();
            } else if (scopes instanceof String) {
                logger.debug("Extracted scopes as authorities from string");
                return Arrays.asList(((String) scopes).split(" "));
            }

        } catch (Exception e) {
            logger.error("Error extracting authorities: {}", e.getMessage());
        }
        return Collections.emptyList();
    }

    public void blacklistToken(String token) {
        try {
            JWTClaimsSet claimsSet = validateJwtSignature(token);
            if (claimsSet != null) {
                String jti = claimsSet.getJWTID();
                String key = BLACKLIST_PREFIX + jti;
                redisTemplate.opsForValue().set(key, true);
                logger.info("Token blacklisted with JTI: {}", jti);
            } else {
                logger.warn("Could not blacklist token - invalid signature");
            }
        } catch (Exception e) {
            logger.error("Error blacklisting token: {}", e.getMessage());
        }
    }

    public static class JWTValidationResult {
        private final boolean valid;
        private final String message;
        private final JWTClaimsSet claimsSet;
        private final List<String> authorities;

        public JWTValidationResult(boolean valid, String message, JWTClaimsSet claimsSet, List<String> authorities) {
            this.valid = valid;
            this.message = message;
            this.claimsSet = claimsSet;
            this.authorities = authorities;
        }

        public boolean isValid() { return valid; }
        public String getMessage() { return message; }
        public JWTClaimsSet getClaimsSet() { return claimsSet; }
        public List<String> getAuthorities() { return authorities; }
    }
}
