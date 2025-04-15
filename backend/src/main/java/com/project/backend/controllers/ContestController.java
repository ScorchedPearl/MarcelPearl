package com.project.backend.controllers;

import com.project.backend.components.Contest;
import com.project.backend.components.Problems;
import com.project.backend.repositories.ContestRepository;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contest")
@RequiredArgsConstructor
public class ContestController {

    private final UserRepository userRepository;
    private final ContestRepository contestRepository;

    @PostMapping
    public ResponseEntity<Contest> createContest(
            @RequestBody Contest contest
    ){
        return new ResponseEntity<>(contestRepository.save(contest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Contest>> getAllContests() {
        return ResponseEntity.ok(contestRepository.findAll());
    }

    @PostMapping("/{contestId}/join")
    public ResponseEntity<String> joinContest(@PathVariable Long contestId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        if (!contest.getUsers().contains(user)) {
            contest.getUsers().add(user);
            contestRepository.save(contest);
        }

        return ResponseEntity.ok("Joined the contest successfully");
    }

    @GetMapping("/{contestId}/users")
    public ResponseEntity<List<Users>> getUsersInContest(@PathVariable Long contestId) {
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));
        return ResponseEntity.ok(contest.getUsers());
    }

    @GetMapping("/{contestId}/problems")
    public ResponseEntity<?> getAllProblems(@PathVariable Long contestId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        if (!contest.getUsers().contains(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You're not registered!");
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(contest.getStartTime())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Contest has not started yet");
        }

        if (now.isAfter(contest.getEndTime())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Contest has already ended");
        }

        return ResponseEntity.ok(contest.getProblems());
    }

}
