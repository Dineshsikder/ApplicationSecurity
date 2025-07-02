package com.oauth.auth_server.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class LogoutController {

    @GetMapping("/connect/logout")
    public void oidcLogout(@RequestParam(name = "post_logout_redirect_uri", required = false) String redirectUri,
                           HttpServletRequest request,
                           HttpServletResponse response) throws Exception {
        // Perform local logout if needed
        request.logout(); // ends Spring Security session

        // Redirect to client post logout URL
        if (redirectUri != null && !redirectUri.isEmpty()) {
            response.sendRedirect(redirectUri);
        } else {
            response.sendRedirect("/");
        }
    }
}
