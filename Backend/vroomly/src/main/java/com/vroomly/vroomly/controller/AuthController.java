package com.vroomly.vroomly.controller;

import com.vroomly.vroomly.User;
import com.vroomly.vroomly.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {

            User savedUser = userService.registerUser(user);

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Account created successfully",
                            "name", savedUser.getFullName(),
                            "email", savedUser.getEmail()
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest().body(
                    Map.of(
                            "message", e.getMessage()
                    )
            );
        }
    }


    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> loginData) {

        String email = loginData.get("email");
        String password = loginData.get("password");

        boolean valid = userService.loginUser(
                email,
                password
        );

        if (valid) {

            return ResponseEntity.ok(
                    Map.of(
                            "message", "Login successful",
                            "email", email
                    )
            );

        } else {

            return ResponseEntity.status(401).body(
                    Map.of(
                            "message",
                            "Invalid email or password"
                    )
            );
        }
    }
}