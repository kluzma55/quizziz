import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(5);
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

  // Odpočítavanie času
  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          handleAnswerTimeout(); // Automatický posun otázky
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, questions]);

  const handleAnswerClick = (selectedIndex: number) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    setFeedback(isCorrect ? 'Správně!' : 'Špatně!');
    clearTimeout();

    setTimeout(() => {
      setFeedback('');
      setScore(updatedScore);
      goToNextQuestion(updatedScore);
    }, 1000);
  };

  const handleAnswerTimeout = () => {
    setFeedback('Čas vypršel!');
    setTimeout(() => {
      setFeedback('');
      goToNextQuestion(score);
    }, 1000);
  };

  const goToNextQuestion = (updatedScore: number) => {
    if (currentIndex + 1 < 10) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(5);
    } else {
      const nickname = localStorage.getItem('nickname');
      const category = localStorage.getItem('category');
      const difficulty = localStorage.getItem('difficulty');

      axios.post('http://localhost:8080/addAppUsers', {
        nickname,
        category,
        difficulty,
        score: updatedScore
      })
        .then(() => navigate('/score'))
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

  return (
    <div>
      <h2>Otázka {currentIndex + 1} / 10</h2>
      <h3>{currentQuestion.questionText}</h3>
      <div className="answers-grid">
        <button className="retro-btn" onClick={() => handleAnswerClick(1)}>{currentQuestion.answer1}</button>
        <button className="retro-btn" onClick={() => handleAnswerClick(2)}>{currentQuestion.answer2}</button>
        <button className="retro-btn" onClick={() => handleAnswerClick(3)}>{currentQuestion.answer3}</button>
        <button className="retro-btn" onClick={() => handleAnswerClick(4)}>{currentQuestion.answer4}</button>
      </div>
      {feedback ? (
        <p>{feedback}</p>
      ) : (
        <p>{timeLeft}</p>
      )}
    </div>
  );
};

export default Questions;
