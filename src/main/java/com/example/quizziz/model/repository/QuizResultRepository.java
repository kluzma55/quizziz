package com.example.quizziz.model.repository;

import com.example.quizziz.model.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Integer> {
    List<QuizResult> findTop10ByOrderByScoreDesc();
}
