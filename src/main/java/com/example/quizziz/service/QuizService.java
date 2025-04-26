package com.example.quizziz.service;

import com.example.quizziz.model.entity.*;
import com.example.quizziz.model.dto.QuestionDTO;
import com.example.quizziz.model.dto.QuizSubmission;
import com.example.quizziz.model.entity.AppUser;
import com.example.quizziz.model.repository.QuestionRepository;
import com.example.quizziz.model.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final AppUserRepository appUserRepository;

    public QuizService(QuestionRepository questionRepository, AppUserRepository appUserRepository) {
        this.questionRepository = questionRepository;
        this.appUserRepository = appUserRepository;
    }

    public void addQuestion(QuestionDTO questionDTO) {
        Question question = new Question();
        question.setQuestion(questionDTO.getQuestionText());
        question.setAnswer1(questionDTO.getAnswer1());
        question.setAnswer2(questionDTO.getAnswer2());
        question.setAnswer3(questionDTO.getAnswer3());
        question.setAnswer4(questionDTO.getAnswer4());
        question.setCorrectAnswer(questionDTO.getCorrectAnswer());
        question.setCategory(questionDTO.getCategory());
        question.setDifficulty(questionDTO.getDifficulty());

        questionRepository.save(question);
    }

    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private QuestionDTO convertToDto(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setQuestionText(question.getQuestion());
        dto.setAnswer1(question.getAnswer1());
        dto.setAnswer2(question.getAnswer2());
        dto.setAnswer3(question.getAnswer3());
        dto.setAnswer4(question.getAnswer4());
        dto.setCorrectAnswer(question.getCorrectAnswer());
        dto.setCategory(question.getCategory());
        dto.setDifficulty(question.getDifficulty());
        return dto;
    }

    public int evaluateQuiz(QuizSubmission submission) {
        int score = 0;

        for (Integer questionId : submission.getAnswers().keySet()) {
            Question question = questionRepository.findById(questionId).orElse(null);
            if (question != null) {
                Integer selectedAnswerId = submission.getAnswers().get(questionId);

                if (question.getCorrectAnswer().equals(selectedAnswerId)) {
                    score++;
                }
            }
        }

        return score;
    }

    public void saveUserResult(String nickname, int score, Category category, Difficulty difficulty) {
        AppUser appUser = new AppUser();
        appUser.setNickname(nickname);
        appUser.setScore(score);
        appUser.setCategory(category);
        appUser.setDifficulty(difficulty);
        appUserRepository.save(appUser);
    }

    public List<AppUser> getTop10Users() {
        return appUserRepository.findTop10ByOrderByScoreDesc();
    }
}