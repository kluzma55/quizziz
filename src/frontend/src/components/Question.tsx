import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
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

  const handleAnswerClick = (selectedIndex: number) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    const updatedScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setFeedback('Správně!');
    } else {
      setFeedback('Špatně!');
    }

    setTimeout(() => {
      setFeedback('');
      if (currentIndex + 1 < 10) {
        setScore(updatedScore);
        setCurrentIndex(currentIndex + 1);
      } else {
        const nickname = localStorage.getItem('nickname');
        const category = localStorage.getItem('category');
        const difficulty = localStorage.getItem('difficulty');

        axios.post('http://localhost:8080/addAppUsers', {
          nickname: nickname,
          category: category,
          difficulty: difficulty,
          score: updatedScore
        })
        .then(() => {
          navigate('/winner');
        })
        .catch(error => {
          console.error('Chyba pri ukladaní hráča:', error);
           navigate('/winner');
        });
      }
    }, 1000);
  };

  if (questions.length === 0) {
    return <p>Načítávám otázky...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>Otázka {currentIndex + 1} / 10</h2>
      <h3>{currentQuestion.questionText}</h3>
      <div>
        <button onClick={() => handleAnswerClick(1)}>{currentQuestion.answer1}</button>
        <button onClick={() => handleAnswerClick(2)}>{currentQuestion.answer2}</button>
        <button onClick={() => handleAnswerClick(3)}>{currentQuestion.answer3}</button>
        <button onClick={() => handleAnswerClick(4)}>{currentQuestion.answer4}</button>
      </div>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Questions;
