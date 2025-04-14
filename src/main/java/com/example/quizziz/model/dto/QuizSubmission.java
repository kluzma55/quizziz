package com.example.quizziz.model.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class QuizSubmission {
    private Map<Integer, Integer> answers;
    //Klíčem je Question ID
    //Hodnota je answer ID
}
