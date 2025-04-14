package com.example.quizziz.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String answer;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    //připojí nám otázku k odpovědi
}
