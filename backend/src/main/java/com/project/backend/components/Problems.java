package com.project.backend.components;

import com.project.backend.user.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "PROBLEMS")
public class Problems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Problem name is required")
    @Column(unique = true, nullable = false)
    private String problemName;

    @NotBlank(message = "Problem statement is required")
    private String problemStatement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @NotBlank
    private String editorial;

    private String hint;

    @ManyToMany(mappedBy = "problems")
    private List<Users> userList;

    @ManyToMany(mappedBy = "problems")
    private List<Topics> topicList;

    @ManyToMany(mappedBy = "problems")
    private List<Languages> languages;

    @OneToMany(mappedBy = "problem")
    private List<Submissions> submissions;

    @ManyToMany(mappedBy = "problems")
    private List<Contest> contests;
}
