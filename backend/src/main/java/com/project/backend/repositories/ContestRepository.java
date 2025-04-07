package com.project.backend.repositories;

import com.project.backend.components.Contest;
import com.project.backend.components.Problems;
import com.project.backend.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContestRepository extends JpaRepository<Contest, Long> {

}

