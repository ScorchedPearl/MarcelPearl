package com.project.backend.components;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USERS")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    @Pattern(
            regexp = "^[A-Za-z0-9+_.-]+@(.+)$",
            message = "Invalid email format"
    )
    private String email;


    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).{6,}$",
            message = "Password must contain at least one special character and be at least 6 characters long"
    )
    private String password;

    private int streak=0;

    private String bio;

    @Pattern(
            regexp = "^(https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif))$",
            message = "Profile photo must be a valid image URL (png, jpg, jpeg, gif)"
    )
    private String profilePhoto;
    @OneToMany(
            mappedBy = "user"
    )
    private List<Submissions> submissions;

    @ManyToMany
    @JoinTable(
            name = "USER_LANGUAGES",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private List<Languages> languages;

    @ManyToMany
    @JoinTable(
            name = "USER_PROBLEMS",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "problem_id")
    )
    private List<Problems> problems;
}
