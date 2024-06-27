package org.example.server.repository;

import org.example.server.entity.WordBase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordBaseRepository extends JpaRepository<WordBase,Long> {
    boolean existsByNameAndUserId(String name, Long userId);
    List<String> findNamesByUserId(Long userId);
}
