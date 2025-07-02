package com.oauth.auth_server.config;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.oauth.auth_server.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
public class AuthorizationServerConfig {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationServerConfig.class);

    private static final KeyPair STATIC_KEY_PAIR = generateRsaKey();

    @Autowired
    private UserService userService;

    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationServerSecurityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring authorization server security filter chain");

        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

                http
        .cors(Customizer.withDefaults())
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // Allow iframe for silent renewal
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint()))
        .getConfigurer(OAuth2AuthorizationServerConfigurer.class)
            .oidc(Customizer.withDefaults());

        http
                .exceptionHandling(exceptions -> exceptions
                        .defaultAuthenticationEntryPointFor(
                                new BearerTokenAuthenticationEntryPoint(),
                                new AntPathRequestMatcher("/userinfo"))
                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/login")));

        logger.info("Authorization server security filter chain configured");
        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        logger.info("Configuring default security filter chain");
        http
                .cors(Customizer.withDefaults())
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // Allow iframe for silent renewal
                )
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/connect/logout").permitAll()
                        .anyRequest().permitAll())
                .formLogin(Customizer.withDefaults())
                .logout(logout -> logout
                        .logoutUrl("/logout") // The endpoint for logout
                        .logoutSuccessUrl("http://localhost:3000") // Redirect URL after successful logout
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID"));
        logger.info("Default security filter chain configured");
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> tokenCustomizer() {
        return context -> {
            if (context.getTokenType().getValue().equals("access_token")) {
                context.getClaims().claims(claims -> {
                    logger.info("Customizing JWT token for principal: {}", context.getPrincipal().getName());

                    // Add audience claim
                    Object currentAud = claims.get("aud");
                    if (currentAud instanceof String) {
                        claims.put("aud", List.of(currentAud, "api-gateway"));
                    } else if (currentAud instanceof List) {
                        List<String> audList = new ArrayList<>((List<String>) currentAud);
                        audList.add("api-gateway");
                        claims.put("aud", audList);
                    } else {
                        claims.put("aud", List.of("api-gateway"));
                    }

                    // Always add roles claim
                    List<String> roles = new ArrayList<>();
                    
                    if (context.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
                        org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) context.getPrincipal();
                        roles = userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList());
                        
                        logger.info("Extracted roles from UserDetails: {}", roles);
                        claims.put("username", userDetails.getUsername());
                        claims.put("roles", roles);
                        claims.put("authorities", roles);
                    } else if (context.getPrincipal() instanceof UsernamePasswordAuthenticationToken authToken) {
                        Object userPrincipal = authToken.getPrincipal();
                        if (userPrincipal instanceof org.springframework.security.core.userdetails.User userDetails) {
                            roles = userDetails.getAuthorities().stream()
                                    .map(GrantedAuthority::getAuthority)
                                    .collect(Collectors.toList());
                            
                            logger.info("Extracted roles from UsernamePasswordAuthenticationToken: {}", roles);
                            claims.put("username", userDetails.getUsername());
                            claims.put("roles", roles);
                            claims.put("authorities", roles);
                        }
                    } else {
                        // Fallback: try to get roles from the principal name
                        logger.info("Principal type: {}, name: {}", context.getPrincipal().getClass().getSimpleName(), context.getPrincipal().getName());
                        // Default to USER role if no roles found
                        roles = List.of("ROLE_USER");
                        claims.put("username", context.getPrincipal().getName());
                        claims.put("roles", roles);
                        claims.put("authorities", roles);
                    }
                    
                    logger.info("Final JWT claims - username: {}, roles: {}", claims.get("username"), claims.get("roles"));
                }); // closes claims lambda
            } // closes if (context.getTokenType()...)
        }; // closes OAuth2TokenCustomizer lambda
    }

    @Bean
    public JwtDecoder jwtDecoder(JWKSource<SecurityContext> jwkSource) {
        logger.info("Configuring JWT decoder with JWK source");
        JwtDecoder decoder = OAuth2AuthorizationServerConfiguration.jwtDecoder(jwkSource);
        logger.info("JWT decoder configured successfully");
        return decoder;
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        RSAPublicKey publicKey = (RSAPublicKey) STATIC_KEY_PAIR.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) STATIC_KEY_PAIR.getPrivate();

        RSAKey rsaKey = new RSAKey.Builder(publicKey)
                .privateKey(privateKey)
                .keyID("OAuth2-demo-fixed-kid") // keep kid fixed
                .build();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return new ImmutableJWKSet<>(jwkSet);
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder()
                .issuer("http://localhost:9000")
                .build();
    }

    @Bean
    public TokenSettings tokenSettings() {
        return TokenSettings.builder()
                .accessTokenTimeToLive(Duration.ofMinutes(15))
                .refreshTokenTimeToLive(Duration.ofDays(1))
                .idTokenSignatureAlgorithm(org.springframework.security.oauth2.jose.jws.SignatureAlgorithm.RS256)
                .build();
    }

    @Bean
    public ClientSettings clientSettings() {
        return ClientSettings.builder()
                .requireProofKey(true) // Enforce PKCE
                .requireAuthorizationConsent(true)
                .build();
    }

    private static KeyPair generateRsaKey() {
        KeyPair keyPair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch (Exception ex) {
            throw new IllegalStateException(ex);
        }
        return keyPair;
    }
}