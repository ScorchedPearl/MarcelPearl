package com.project.backend.auth;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;

@Service
public class GoogleAuthService {

    public GoogleUserDto getGoogleUserInfo(String accessToken) {
        String googleUserInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JsonNode> response = restTemplate.exchange(googleUserInfoUrl, HttpMethod.GET, entity, JsonNode.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            JsonNode body = response.getBody();
            if (body != null) {
                GoogleUserDto user = new GoogleUserDto();
                user.setEmail(body.get("email").asText());
                user.setName(body.get("name").asText());
                user.setProfilePicture(body.get("picture").asText());
                return user;
            }
        }
        throw new RuntimeException("Failed to fetch Google user info");
    }
}

