package com.project.backend.controllers;

import com.project.backend.auth.EmailService;
import com.project.backend.components.ContactRequest;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {
    private final EmailService emailService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> sendContactMessage(
            @RequestBody ContactRequest request,
            Principal principal
    ){
        Users user = userRepository.findByMarcelPearlId(principal.getName())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String subject="Contact Form Submission from " + user.getUsername();
        String body="Sender: " + user.getUsername() + "\n" +
                    "Email: " + user.getEmail() + "\n\n" +
                    request.getMessage();
        emailService.sendEmail("marcellapearl0627@gmail.com", subject, body);
        return ResponseEntity.ok("Message sent successfully!");
    }
}
