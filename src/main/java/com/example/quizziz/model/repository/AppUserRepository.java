package com.example.quizziz.model.repository;

import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import com.example.quizziz.model.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
    List<AppUser> findByCategoryAndDifficulty(Category category, Difficulty difficulty);
    List<AppUser> findTop10ByOrderByScoreDesc();
}
