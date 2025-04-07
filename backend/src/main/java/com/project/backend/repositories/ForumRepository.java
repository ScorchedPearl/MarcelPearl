package com.project.backend.repositories;

import com.project.backend.components.Forums;
import com.project.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForumRepository extends JpaRepository<Forums,Long> {
    List<Forums> findByUser(Users user);
}
