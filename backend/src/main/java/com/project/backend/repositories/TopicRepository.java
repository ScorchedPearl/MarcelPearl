package com.project.backend.repositories;

import com.project.backend.components.Topics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepository extends JpaRepository<Topics, Long> {
    Optional<Topics> findByTopicName(String topicName);
}
