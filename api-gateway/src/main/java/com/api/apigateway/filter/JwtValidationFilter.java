package com.api.apigateway.filter;

import com.api.apigateway.service.JwtValidationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtValidationFilter extends AbstractGatewayFilterFactory<JwtValidationFilter.Config> {

    private static final Logger logger = LoggerFactory.getLogger(JwtValidationFilter.class);

    @Autowired
    private JwtValidationService jwtValidationService;

    public JwtValidationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            String path = request.getPath().value();
            logger.info("Incoming request path: {}", path);

            if (isPublicEndpoint(path)) {
                logger.info("Skipping JWT validation for public endpoint: {}", path);
                return chain.filter(exchange);
            }

            String token = extractToken(request);
            if (!StringUtils.hasText(token)) {
                logger.warn("Missing JWT token in request to {}", path);
                return createErrorResponse(response, "Missing JWT token", HttpStatus.UNAUTHORIZED);
            }

            logger.info("Validating JWT token for request to {}", path);

            return jwtValidationService.validateToken(token)
                    .flatMap(validationResult -> {
                        if (!validationResult.isValid()) {
                            logger.warn("JWT validation failed: {}", validationResult.getMessage());
                            return createErrorResponse(response, validationResult.getMessage(), HttpStatus.UNAUTHORIZED);
                        }

                        logger.info("JWT validated successfully for user: {}", validationResult.getClaimsSet().getSubject());

                        ServerHttpRequest modifiedRequest = addUserInfoToHeaders(request, validationResult);
                        return chain.filter(exchange.mutate().request(modifiedRequest).build());
                    })
                    .onErrorResume(e -> {
                        logger.error("Error during JWT validation: {}", e.getMessage(), e);
                        return createErrorResponse(response, "Token validation failed", HttpStatus.UNAUTHORIZED);
                    });
        };
    }

    private boolean isPublicEndpoint(String path) {
        return path.startsWith("/public") ||
               path.startsWith("/auth") ||
               path.startsWith("/actuator") ||
               path.startsWith("/oauth2") ||
               path.startsWith("/.well-known");
    }

    private String extractToken(ServerHttpRequest request) {
        String bearerToken = request.getHeaders().getFirst("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private ServerHttpRequest addUserInfoToHeaders(ServerHttpRequest request, JwtValidationService.JWTValidationResult validationResult) {
        String email = "";
        String username = "";
        try { email = validationResult.getClaimsSet().getStringClaim("email"); } catch (ParseException ignored) {}
        try { username = validationResult.getClaimsSet().getStringClaim("preferred_username"); } catch (ParseException ignored) {}

        logger.debug("Injecting user info into headers: user={}, email={}", username, email);

        return request.mutate()
                .header("X-User-ID", validationResult.getClaimsSet().getSubject())
                .header("X-User-Authorities", String.join(",", validationResult.getAuthorities()))
                .header("X-User-Email", email)
                .header("X-User-Name", username)
                .build();
    }

    private Mono<Void> createErrorResponse(ServerHttpResponse response, String message, HttpStatus status) {
        response.setStatusCode(status);
        response.getHeaders().add("Content-Type", "application/json");

        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);
        errorResponse.put("status", status.value());
        errorResponse.put("timestamp", LocalDateTime.now());

        String jsonResponse = convertToJson(errorResponse);
        return response.writeWith(Mono.just(response.bufferFactory().wrap(jsonResponse.getBytes())));
    }

    private String convertToJson(Map<String, Object> data) {
        StringBuilder json = new StringBuilder("{");
        boolean first = true;
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            if (!first) json.append(",");
            json.append("\"").append(entry.getKey()).append("\":");
            if (entry.getValue() instanceof String) {
                json.append("\"").append(entry.getValue()).append("\"");
            } else {
                json.append(entry.getValue());
            }
            first = false;
        }
        json.append("}");
        return json.toString();
    }

    public static class Config {}
}
