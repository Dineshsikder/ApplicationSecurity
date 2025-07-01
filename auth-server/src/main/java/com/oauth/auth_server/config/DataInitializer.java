package com.oauth.auth_server.config;

import com.oauth.auth_server.model.User;
import com.oauth.auth_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize sample users if database is empty
        if (userRepository.count() == 0) {
            // Create regular user
            User user = new User();
            user.setUsername("user");
            user.setPassword(passwordEncoder.encode("password"));
            user.setEmail("user@example.com");
            user.setFirstName("Demo");
            user.setLastName("User");
            user.setRole("USER");
            userRepository.save(user);

            // Create admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("password"));
            admin.setEmail("admin@example.com");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setRole("ADMIN");
            userRepository.save(admin);

            System.out.println("Sample users initialized:");
            System.out.println("- user@example.com (USER role) - username: user, password: password");
            System.out.println("- admin@example.com (ADMIN role) - username: admin, password: password");
        }
    }
} 