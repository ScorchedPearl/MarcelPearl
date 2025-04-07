package com.project.backend.components;

import com.project.backend.user.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users user;

    private LocalDateTime createdAt;

    @ManyToOne
    private Forums forum;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
