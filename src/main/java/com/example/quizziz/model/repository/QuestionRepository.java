package com.example.quizziz.model.repository;

import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import com.example.quizziz.model.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByCategory(Category category);
    List<Question> findByDifficulty(Difficulty difficulty);
    List<Question> findByCategoryAndDifficulty(Category category, Difficulty difficulty);

}

