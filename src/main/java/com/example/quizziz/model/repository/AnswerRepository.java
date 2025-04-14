package com.example.quizziz.model.repository;

import com.example.quizziz.model.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
}
