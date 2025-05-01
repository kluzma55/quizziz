import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedCategory = localStorage.getItem('category');
    const selectedDifficulty = localStorage.getItem('difficulty');

    axios.get('http://localhost:8080/questions')
      .then(response => {
        let allQuestions = response.data;
        if (selectedCategory) {
          allQuestions = allQuestions.filter((q: any) => q.category === selectedCategory);
        }
        if (selectedDifficulty) {
          allQuestions = allQuestions.filter((q: any) => q.difficulty === selectedDifficulty);
        }

        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 10);
        setQuestions(selectedQuestions);
      })
      .catch(error => {
        console.error('Chyba při načítaní otázek:', error);
      });
  }, []);
  
  useEffect(() => {
    if (questions.length === 0) return;
  
    setTimeLeft(8);
  
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    const timeout = setTimeout(() => {
        goToNextQuestion(score);
    }, 8000);
  
    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [currentIndex, questions]);
  

  const handleAnswerClick = (selectedIndex: number) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    setFeedback(isCorrect ? 'Správně!' : 'Špatně!');

    setTimeout(() => {
      setScore(updatedScore);
      setFeedback('');
      goToNextQuestion(updatedScore);
    }, 1000);
  };

  const goToNextQuestion = (updatedScore: number) => {
    if (currentIndex + 1 < 10) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const nickname = localStorage.getItem('nickname');
      const category = localStorage.getItem('category');
      const difficulty = localStorage.getItem('difficulty');
      localStorage.setItem('score', updatedScore.toString());

      axios.post('http://localhost:8080/addAppUsers', {
        nickname,
        category,
        difficulty,
        score: updatedScore
      })
        .then(() => {
          navigate('/score');
        })
        .catch(error => {
          console.error('Chyba při ukládání hráče:', error);
          navigate('/score');
        });
    }
  };

  if (questions.length === 0) {
    return <p>Načítávám otázky...</p>;
  }

  const currentQuestion = questions[currentIndex];
  const timer = timeLeft - 1;

  return (
    <div className="centered-container">
      <h2>Otázka {currentIndex + 1} / 10</h2>
      <h3>{currentQuestion.questionText}</h3>
      <div className="answers-grid">
        <button className="retro-btn" disabled={timer === 0} onClick={() => handleAnswerClick(1)}>{currentQuestion.answer1}</button>
        <button className="retro-btn" disabled={timer === 0} onClick={() => handleAnswerClick(2)}>{currentQuestion.answer2}</button>
        <button className="retro-btn" disabled={timer === 0} onClick={() => handleAnswerClick(3)}>{currentQuestion.answer3}</button>
        <button className="retro-btn" disabled={timer === 0} onClick={() => handleAnswerClick(4)}>{currentQuestion.answer4}</button>
      </div>

      <p>{feedback ? feedback : timer}</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(timer / 7) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Questions;
