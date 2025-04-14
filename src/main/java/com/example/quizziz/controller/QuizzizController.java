package com.example.quizziz.controller;

import com.example.quizziz.model.dto.QuestionDTO;
import com.example.quizziz.model.dto.QuizSubmission;
import com.example.quizziz.model.entity.QuizResult;
import com.example.quizziz.service.QuizService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class QuizzizController {
    @Value("${${app.name}")
    private String appName;

    @GetMapping(value = "/appname")
    public String getName(@RequestParam ("value") String name) {
        return "inserted name is " + name;
    }
    private final QuizService quizService;

    public QuizzizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions() {
        List<QuestionDTO> questions = quizService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping("/submit")
    public ResponseEntity<Integer> submitQuiz(@RequestBody QuizSubmission submission /*,@AuthenticationPrincipal AppUser user*/ ) { // If you use Spring Security uncomment @AuthenticationPrincipal and the parameter
        int score = quizService.evaluateQuiz(submission);
        //quizService.saveQuizResult(user, score);  // If you use Spring Security and you want to save the result in database uncomment this line
        return new ResponseEntity<>(score, HttpStatus.OK);
    }
    @PostMapping("/result")
    public ResponseEntity<String> saveResult(@RequestParam String nickname, @RequestParam int score) {
        quizService.saveQuizResult(nickname, score);
        return new ResponseEntity<>("Result saved!", HttpStatus.OK);
    }

    @GetMapping("/top10")
    public ResponseEntity<List<QuizResult>> getTop10() {
        List<QuizResult> top10 = quizService.getTop10Results();
        return new ResponseEntity<>(top10, HttpStatus.OK);
    }
}
