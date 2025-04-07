package com.project.backend.repositories;

import com.project.backend.components.Difficulty;
import com.project.backend.components.Problems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problems, Long> {
    List<Problems> findByDifficulty(Difficulty difficulty);
}
