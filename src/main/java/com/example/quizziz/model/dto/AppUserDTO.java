package com.example.quizziz.model.dto;

import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDTO {
    private String nickname;
    private Integer score;
    private Category category;
    private Difficulty difficulty;
}
