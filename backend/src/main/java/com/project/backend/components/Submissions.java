package com.project.backend.components;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SUBMISSIONS")
public class Submissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String submittedCode;

    private int beats=0;

    @ManyToOne
    @JoinColumn(
            name = "user_id",nullable = false
    )
    private Users user;

    @ManyToOne
    @JoinColumn(
            name = "problem_id",nullable = false
    )
    private Problems problem;

    @ManyToOne
    @JoinColumn(
            name = "language_id",nullable = false
    )
    private Languages language;
}
