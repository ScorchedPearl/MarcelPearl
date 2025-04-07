package com.project.backend.controllers;

import com.project.backend.components.*;
import com.project.backend.repositories.ContestRepository;
import com.project.backend.user.ContestPerformanceResponse;
import com.project.backend.user.UserDashboardResponse;
import com.project.backend.user.UserRepository;
import com.project.backend.user.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final UserRepository userRepository;

    @GetMapping("/{username}")
    public ResponseEntity<UserDashboardResponse> getDashboardData(@PathVariable String username){
        Users user=userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User Not Found"));

        Map<String,Long> difficultyCount = user.getProblems().stream()
                .collect(Collectors.groupingBy(p->p.getDifficulty().name(), Collectors.counting()));

        long totalSolved=user.getProblems().size();

        List<Submissions> latestSubmissions = user.getSubmissions().stream()
                .sorted((a,b)->b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(5)
                .toList();

        List<ContestPerformanceResponse> performance = user.getContestPerformances().stream()
                .sorted(Comparator.comparing(ContestPerformance::getPerformanceTime))
                .map(cp->new ContestPerformanceResponse(cp.getPerformanceTime(),cp.getRank()))
                .toList();

        List<String> languages = user.getLanguages().stream()
                .map(Languages::getLanguageName)
                .toList();

        List<Forums> forums = user.getForums();

        UserDashboardResponse response = new UserDashboardResponse(
                user.getUsername(),
                user.getBio(),
                user.getBadges(),
                user.getProfilePhoto(),
                user.getStreak(),
                difficultyCount,
                totalSolved,
                latestSubmissions,
                performance,
                forums,
                languages
        );

        return ResponseEntity.ok(response);
    }
}
