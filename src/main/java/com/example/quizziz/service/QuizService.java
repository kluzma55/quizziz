package com.example.quizziz.service;

import com.example.quizziz.model.dto.QuestionDTO;
import com.example.quizziz.model.dto.QuizSubmission;
import com.example.quizziz.model.entity.Question;
import com.example.quizziz.model.entity.QuizResult;
import com.example.quizziz.model.repository.AnswerRepository;
import com.example.quizziz.model.repository.QuestionRepository;
import com.example.quizziz.model.repository.QuizResultRepository;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;

    public QuizService(QuestionRepository questionRepository, QuizResultRepository quizResultRepository) {
        this.questionRepository = questionRepository;
        this.quizResultRepository = quizResultRepository;
    }

    public List<QuestionDTO> getAllQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private QuestionDTO convertToDto(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuestion_text(question.getQuestion());
        dto.setAnswers(question.getAnswers().stream()
                .map(answer -> new com.example.quizziz.model.dto.AnswerDTO(answer.getId(), answer.getAnswer()))
                .collect(Collectors.toList()));
        return dto;
    }

    public int evaluateQuiz(QuizSubmission submission) {
        int score = 0;
        for (Integer questionId : submission.getAnswers().keySet()) {
            Question question = questionRepository.findById(questionId).orElse(null);
            if (question != null) {
                Integer selectedAnswerId = submission.getAnswers().get(questionId);
                if (question.getCorrectAnswerId().equals(selectedAnswerId)) {
                    score++;
                }
            }
        }
        return score;
    }

    public void saveQuizResult(String nickname, int score) {
        QuizResult result = new QuizResult();
        result.setNickname(nickname);
        result.setScore(score);
        quizResultRepository.save(result);
    }
    public List<QuizResult> getTop10Results(){
        return quizResultRepository.findTop10ByOrderByScoreDesc();
    }

}
