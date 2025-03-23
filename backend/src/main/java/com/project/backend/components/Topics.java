package com.project.backend.components;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TOPICS")
public class Topics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Topic name is required")
    @Column(unique = true, nullable = false)
    private String topicName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty topicDifficulty;

    @ManyToMany
    @JoinTable(
            name = "TOPIC_PROBLEMS",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private List<Problems> problems;
}
