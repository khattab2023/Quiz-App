
import { useState } from "react";
import {resultInitalState } from "./constants";

const Quiz = ({ questions }) => {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState); //*The first case to get the 

  const { question, choices, correctAnswer } = questions[currentQuestion];
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if(answer === correctAnswer ) {
      setAnswer(true)
    }else{
      setAnswer(false)
    }
  };
  //* update the status 
const onClickNext = () => {
  setAnswerIdx(null)   //* Reset the answer
  setResult((prev) => 
    answer
    ? {
      ...prev,
      score: prev.score + 5,
      correctAnswers: prev.correctAnswers + 1,  //*if chose correct answers
    } : {
      ...prev,
      wrongAnswers: prev.wrongAnswers + 1,        //*if chose wrong answers
    }
  )
  if(currentQuestion !== questions.length - 1) {
      setcurrentQuestion((prev) => prev + 1);
  } else {
    setcurrentQuestion(0);
  }
}

  return <div className="quiz-container">
      <>
        <span className="active-question-no">{currentQuestion + 1}</span>
        <span className="total-question">/{questions.length}</span>
        <h2>{question}</h2>
        <ul>
          {
            choices.map((answer, index) => (
              <li 
              onClick={() => onAnswerClick(answer, index)}
              key={answer}
              className={answerIdx === index  ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))
          }
        </ul>
        <div className="footer">
          <button onClick={onClickNext} disabled={answerIdx === null}>
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </>
    </div>;
};

export default Quiz;
