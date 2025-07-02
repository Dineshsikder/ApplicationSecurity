package com.oauth.auth_server.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class FrameOptionsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Check if this is a silent renewal request
        String requestURI = httpRequest.getRequestURI();
        if (requestURI.contains("/silent-renew") || 
            requestURI.contains("/oauth2/authorize") ||
            requestURI.contains("/oauth2/token")) {
            
            // Remove X-Frame-Options header for silent renewal
            httpResponse.setHeader("X-Frame-Options", "SAMEORIGIN");
        }
        
        chain.doFilter(request, response);
    }
} 