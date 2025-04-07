package com.project.backend.controllers;

import com.project.backend.components.Difficulty;
import com.project.backend.components.Problems;
import com.project.backend.components.TopicRequest;
import com.project.backend.components.Topics;
import com.project.backend.repositories.ProblemRepository;
import com.project.backend.repositories.TopicRepository;
import com.project.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemsController {
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final TopicRepository topicRepository;

    @GetMapping
    public ResponseEntity<List<Problems>> getAllProblems() {
        return ResponseEntity.ok(problemRepository.findAll());
    }

    @GetMapping("/by-difficulty")
    public ResponseEntity<List<Problems>> getProblemByDifficulty(
            @RequestParam Difficulty difficulty
    ){
        return ResponseEntity.ok(problemRepository.findByDifficulty(difficulty));
    }

    @PostMapping("/by-topic")
    public ResponseEntity<?> getProblemsByTopic(@RequestBody TopicRequest request) {
        Topics topic = topicRepository.findByTopicName(request.getTopicName())
                .orElseThrow(() -> new RuntimeException("Topic not found"));
        return ResponseEntity.ok(topic.getProblems());
    }

    @PostMapping("/by-topic-and-difficulty")
    public ResponseEntity<List<Problems>> getProblemsByTopicAndDifficulty(
            @RequestBody TopicRequest request,
            @RequestParam Difficulty difficulty
    ){
        Topics topic = topicRepository.findByTopicName(request.getTopicName())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        List<Problems> filtered = topic.getProblems().stream()
                .filter(p -> p.getDifficulty().equals(difficulty))
                .toList();

        return ResponseEntity.ok(filtered);
    }
}
