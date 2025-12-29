package com.orderly.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * DTO for authentication response with JWT token
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    @Builder.Default
    private String type = "Bearer";
    private Long userId;
    private String email;
    private String name;
    private Set<String> roles;

    public AuthResponse(String token, Long userId, String email, String name, Set<String> roles) {
        this.token = token;
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.roles = roles;
    }
}
