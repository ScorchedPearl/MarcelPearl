package com.project.backend.controllers;

import com.project.backend.components.Forums;
import com.project.backend.repositories.ForumRepository;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/forums")
@RequiredArgsConstructor
public class ForumController {
    private final ForumRepository forumRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Forums> createForum(
            @RequestBody Forums forum,
            Principal principal
    ) {
        Users user = userRepository.findByMarcelPearlId(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        forum.setUser(user);
        forum.setCreatedAt(LocalDateTime.now());
        Forums savedForum = forumRepository.save(forum);
        return ResponseEntity.ok(savedForum);
    }

    @GetMapping
    public ResponseEntity<List<Forums>> getAllForums() {
        return ResponseEntity.ok(forumRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Forums> getForumById(@PathVariable Long id) {
        Forums forum=forumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Forum not found"));
        return ResponseEntity.ok(forum);
    }

    @GetMapping("/my-forums")
    public ResponseEntity<List<Forums>> getMyForums(Principal principal) {
        Users user=userRepository.findByMarcelPearlId(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Forums> forums=forumRepository.findByUser(user);
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Forums>> getUserForums(@PathVariable String marcelPearlId) {
        Users user=userRepository.findByMarcelPearlId(marcelPearlId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Forums> forums=forumRepository.findByUser(user);
        return ResponseEntity.ok(forums);
    }
}
