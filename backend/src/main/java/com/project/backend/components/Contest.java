package com.project.backend.components;

import com.project.backend.user.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String contestName;

    private String contestDescription;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ManyToMany
    @JoinTable(
            name = "contest_users",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> users;

    @ManyToMany
    @JoinTable(
            name = "contest_problems",
            joinColumns = @JoinColumn(name = "contest_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private List<Problems> problems;

    @OneToMany(mappedBy = "contest")
    private List<ContestPerformance> contestPerformances;
}
