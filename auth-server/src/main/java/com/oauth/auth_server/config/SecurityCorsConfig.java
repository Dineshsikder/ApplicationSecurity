package com.oauth.auth_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityCorsConfig {
    // Commenting out duplicate CORS configuration to avoid conflicts
    // The CORS configuration is now handled in AuthorizationServerConfig
    
    // @Bean
    // public CorsFilter corsFilter() {
    //     CorsConfiguration config = new CorsConfiguration();
    //     config.addAllowedOrigin("http://localhost:3000");
    //     config.addAllowedHeader("*");
    //     config.addAllowedMethod("*");
    //     config.setAllowCredentials(true);

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", config);
    //     return new CorsFilter(source);
    // }
} 