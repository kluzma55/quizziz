package com.example.quizziz.controller;

import com.example.quizziz.model.dto.QuestionDTO;
import com.example.quizziz.model.dto.QuizSubmission;
import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import com.example.quizziz.model.entity.AppUser;
import com.example.quizziz.model.repository.AppUserRepository;
import com.example.quizziz.service.QuizService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuizzizController {
    @Value("${app.name}")
    private String appName;

    private final QuizService quizService;

    @GetMapping(value = "/appname")
    public String getName(@RequestParam ("value") String name) {
        return "inserted name is " + name;
    }


    public QuizzizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions() {
        List<QuestionDTO> questions = quizService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/addQuestions")
    public ResponseEntity<String> addQuestion(@RequestBody QuestionDTO questionDTO) {
        quizService.addQuestion(questionDTO);
        return new ResponseEntity<>("Otázka byla úspěšně přidána!", HttpStatus.CREATED);
    }

    @PostMapping("/submit")
    public ResponseEntity<Integer> submitQuiz(@RequestBody QuizSubmission submission) {
        int score = quizService.evaluateQuiz(submission);
        return new ResponseEntity<>(score, HttpStatus.OK);
    }

    @PostMapping("/result")
    public ResponseEntity<String> saveResult(@RequestParam String nickname,
                                             @RequestParam int score,
                                             @RequestParam Category category,
                                             @RequestParam Difficulty difficulty) {
        quizService.saveUserResult(nickname, score, category, difficulty);
        return new ResponseEntity<>("Result saved!", HttpStatus.OK);
    }

    @GetMapping("/top10")
    public ResponseEntity<List<AppUser>> getTop10() {
        List<AppUser> top10 = quizService.getTop10Users();
        return new ResponseEntity<>(top10, HttpStatus.OK);
    }
}
