package org.example.server.repository;

import org.example.server.entity.WordBase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordBaseRepository extends JpaRepository<WordBase,Long> {
    boolean existsByNameAndUserId(String name, Long userId);
}
