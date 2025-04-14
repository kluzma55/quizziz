package com.example.quizziz.model.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class QuestionDTO {
    private Integer id;
    private String question_text;
    private List<AnswerDTO> answers;
}
