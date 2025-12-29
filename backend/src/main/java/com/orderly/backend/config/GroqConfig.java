package com.orderly.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "groq")
@Data
public class GroqConfig {
    private String apiKey;
    private String apiUrl;
    private String model;
}
