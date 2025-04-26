package com.example.quizziz.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class QuizSubmission {
    private String nickname;
    private Map<Integer, Integer> answers;
}
