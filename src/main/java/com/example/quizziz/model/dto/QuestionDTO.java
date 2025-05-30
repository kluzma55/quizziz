package com.example.quizziz.model.dto;

import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private String questionText;
    private String answer1;
    private String answer2;
    private String answer3;
    private String answer4;
    private Integer correctAnswer;
    private Category category;
    private Difficulty difficulty;
}

