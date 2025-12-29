package com.orderly.backend.service;

import com.orderly.backend.dto.AuthResponse;
import com.orderly.backend.dto.LoginRequest;
import com.orderly.backend.dto.RegisterRequest;
import com.orderly.backend.entity.Role;
import com.orderly.backend.entity.User;
import com.orderly.backend.repository.RoleRepository;
import com.orderly.backend.repository.UserRepository;
import com.orderly.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service for authentication operations
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Get roles from request
        Set<Role> roles = new HashSet<>();
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            for (String roleName : request.getRoles()) {
                try {
                    Role.RoleName roleEnum = Role.RoleName.valueOf(roleName.toUpperCase());
                    Role role = roleRepository.findByRoleName(roleEnum)
                            .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName));
                    roles.add(role);
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("Invalid role: " + roleName);
                }
            }
        } else {
            // Default to CONSUMER role
            Role consumerRole = roleRepository.findByRoleName(Role.RoleName.CONSUMER)
                    .orElseThrow(() -> new IllegalStateException("Default CONSUMER role not found"));
            roles.add(consumerRole);
        }

        // Create user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .provider("LOCAL")
                .isActive(true)
                .emailVerified(false)
                .roles(roles)
                .build();

        user = userRepository.save(user);

        // Generate JWT token
        org.springframework.security.core.userdetails.User principal = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                user.getRoles().stream()
                        .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                "ROLE_" + role.getRoleName().name()))
                        .collect(Collectors.toList()));

        String token = jwtService.generateToken(principal);

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRoles().stream()
                        .map(role -> role.getRoleName().name())
                        .collect(Collectors.toSet()));
    }

    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // Load user
        User user = userRepository.findByEmailWithRoles(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate JWT token
        org.springframework.security.core.userdetails.User principal = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                user.getRoles().stream()
                        .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                "ROLE_" + role.getRoleName().name()))
                        .collect(Collectors.toList()));

        String token = jwtService.generateToken(principal);

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRoles().stream()
                        .map(role -> role.getRoleName().name())
                        .collect(Collectors.toSet()));
    }
}
