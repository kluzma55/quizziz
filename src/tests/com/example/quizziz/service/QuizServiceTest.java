package com.example.quizziz.service;

import com.example.quizziz.model.dto.AppUserDTO;
import com.example.quizziz.model.dto.QuestionDTO;
import com.example.quizziz.model.entity.AppUser;
import com.example.quizziz.model.entity.Category;
import com.example.quizziz.model.entity.Difficulty;
import com.example.quizziz.model.entity.Question;
import com.example.quizziz.model.repository.AppUserRepository;
import com.example.quizziz.model.repository.QuestionRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AppUserRepository appUserRepository;

    @InjectMocks
    private QuizService quizService;

    @Test
    void testAddQuestion() {
        QuestionDTO dto = new QuestionDTO();
        dto.setQuestionText("What is 2+2?");
        dto.setAnswer1("3");
        dto.setAnswer2("4");
        dto.setAnswer3("5");
        dto.setAnswer4("6");
        dto.setCorrectAnswer(4);
        dto.setCategory(Category.MATHEMATICS);
        dto.setDifficulty(Difficulty.EASY);

        quizService.addQuestion(dto);

        ArgumentCaptor<Question> questionCaptor = ArgumentCaptor.forClass(Question.class);
        verify(questionRepository).save(questionCaptor.capture());

        Question saved = questionCaptor.getValue();
        assertEquals("What is 2+2?", saved.getQuestion());
        assertEquals(4, saved.getCorrectAnswer());
        assertEquals(Category.MATHEMATICS, saved.getCategory());
        assertEquals(Difficulty.EASY, saved.getDifficulty());
    }

    @Test
    void testGetTop10Users() {
        List<AppUser> mockUsers = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            AppUser user = new AppUser();
            user.setNickname("User" + i);
            user.setScore(100 - i);
            mockUsers.add(user);
        }

        when(appUserRepository.findTop10ByOrderByScoreDesc()).thenReturn(mockUsers);

        List<AppUser> result = quizService.getTop10Users();

        assertEquals(10, result.size());
        assertEquals("User0", result.get(0).getNickname());
        assertEquals(100, result.get(0).getScore());
        assertEquals("User9", result.get(9).getNickname());
        assertEquals(91, result.get(9).getScore());
        verify(appUserRepository, times(1)).findTop10ByOrderByScoreDesc();
    }

    @Test
    void testGetAllQuestions() {
        Question question = new Question();
        question.setQuestion("What is Java?");
        question.setAnswer1("Programming language");
        question.setAnswer2("Coffee");
        question.setAnswer3("Island");
        question.setAnswer4("All of the above");
        question.setCorrectAnswer(4);
        question.setCategory(Category.INFORMATICS);
        question.setDifficulty(Difficulty.MEDIUM);

        when(questionRepository.findAll()).thenReturn(List.of(question));

        List<QuestionDTO> result = quizService.getAllQuestions();

        assertEquals(1, result.size());
        QuestionDTO dto = result.get(0);
        assertEquals("What is Java?", dto.getQuestionText());
        assertEquals("Programming language", dto.getAnswer1());
        assertEquals("Coffee", dto.getAnswer2());
        assertEquals("Island", dto.getAnswer3());
        assertEquals("All of the above", dto.getAnswer4());
        assertEquals(4, dto.getCorrectAnswer());
        assertEquals(Category.INFORMATICS, dto.getCategory());
        assertEquals(Difficulty.MEDIUM, dto.getDifficulty());
    }

    @Test
    void testAddAppUser() {
        AppUserDTO appUserDTO = new AppUserDTO();
        appUserDTO.setNickname("User1");
        appUserDTO.setScore(100);
        appUserDTO.setCategory(Category.INFORMATICS);
        appUserDTO.setDifficulty(Difficulty.MEDIUM);

        quizService.addAppUser(appUserDTO);

        ArgumentCaptor<AppUser> appUserCaptor = ArgumentCaptor.forClass(AppUser.class);
        verify(appUserRepository, times(1)).save(appUserCaptor.capture());

        AppUser savedUser = appUserCaptor.getValue();
        assertEquals("User1", savedUser.getNickname());
        assertEquals(100, savedUser.getScore());
        assertEquals(Category.INFORMATICS, savedUser.getCategory());
        assertEquals(Difficulty.MEDIUM, savedUser.getDifficulty());
    }

}
