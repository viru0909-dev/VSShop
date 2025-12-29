package com.orderly.backend.service;

import com.orderly.backend.config.GroqConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroqService {

    private final GroqConfig groqConfig;
    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatCompletion(String message) {
        String apiKey = groqConfig.getApiKey();
        if (apiKey == null || apiKey.contains("YOUR_")) {
            return "I'm ready to help, but my brain (API Key) is missing. Please ask the admin to configure it!";
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(apiKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", groqConfig.getModel());

            // System prompt to set persona
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content",
                    "You are Orderly AI, a helpful and chic fashion assistant. expert in women's fashion trends. Keep responses concise, friendly, and engaging.");

            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", message);

            requestBody.put("messages", List.of(systemMessage, userMessage));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    groqConfig.getApiUrl() + "/chat/completions",
                    entity,
                    Map.class);

            if (response.getBody() != null && response.getBody().containsKey("choices")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                    return (String) messageObj.get("content"); // Assuming content is string
                }
            }

            return "I'm having a bad hair day (API error). Please try again.";

        } catch (Exception e) {
            log.error("Error calling Groq API", e);
            return "Oops! I encountered an error providing that fashion advice. (" + e.getMessage() + ")";
        }
    }
}
