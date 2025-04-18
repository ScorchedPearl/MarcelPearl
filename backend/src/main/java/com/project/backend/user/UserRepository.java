package com.project.backend.user;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByMarcelPearlId(@NotBlank(message = "UserId is required") String marcelPearlId);
}
