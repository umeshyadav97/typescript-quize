import React, { useState } from "react";
import { fetchQuizeQuestions } from "./API";
import { QuestionsState, Difficulty } from "./API";
import QuizeQuestion from "./components/QuizeQuestion";
import Background from "./images/cool-background.png";

import "./style.css";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUES = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuize = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizeQuestions(
      TOTAL_QUES,
      Difficulty.MEDIUM
    );
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestions = () => {
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUES) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="imageContainer">
          <img className="imageTag" src={Background} alt="background" />
        </div>
        <div className="contentOverlay">
          <h1 className="headingText">Quiz Questions</h1>
          {gameOver || userAnswers.length === TOTAL_QUES ? (
            <button
              style={{
                width: "120px",
                height: "40px",
                borderRadius: "16px",
                cursor: "pointer",
              }}
              onClick={startQuize}
            >
              Start
            </button>
          ) : null}
          {!gameOver ? <p className="headingText">Score: {score}</p> : null}
          {loading ? (
            <div className="progress">
              <div className="color"></div>
            </div>
          ) : null}
          {!loading && !gameOver && (
            <QuizeQuestion
              questionNr={number + 1}
              totalQuestions={TOTAL_QUES}
              question={questions[number]?.question}
              answers={questions[number]?.answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver && !loading ? (
            <button
              style={{
                width: "120px",
                height: "40px",
                borderRadius: "16px",
                cursor: "pointer",
                marginTop: "20px",
              }}
              onClick={nextQuestions}
            >
              Next Question
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
