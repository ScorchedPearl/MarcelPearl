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
@Builder
@Entity
@Table(name = "LANGUAGES")
public class Languages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Language name is required")
    @Column(unique = true, nullable = false)
    private String languageName;

    private String languageLogo;

    @ManyToMany(mappedBy = "languages")
    private List<Users> userList;

    @ManyToMany
    @JoinTable(
            name = "LANGUAGE_PROBLEMS",
            joinColumns = @JoinColumn(name = "language_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private List<Problems> problems;

    @OneToMany(mappedBy = "language")
    private List<Submissions> submissions;
}
