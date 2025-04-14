package com.example.quizziz.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    //Vygeneruje se id, které bude jako primární klíč otázky

    @Column(nullable = false, length = 1000)
    private String question;
    //otázka může mít délku až 100 znaků, nesmí být nulová

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;
    //list odpovědí
    //mappedBy = question znamená, že vztah je mapován atributem question ve třídě Answer
    //cascade = pokud je otázka aktualizována, smazána nebo uložena, automaticky se to provede i na odpovědích
    //orhphanRemoval = pokud je odpověĎ odstraněna, automaticky bude otázka smazána

    @Column(nullable = false)
    private String result;
    //odpověď nemůže být nulová (musí tam být nějaký text)
    //odpovědí bude buď celá odpověď nebo písmeno

    @Column(nullable = false)
    private Integer correctAnswerId;
}
