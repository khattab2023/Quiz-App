import { useState } from "react";
import { resultInitalState } from "../../constants";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
import "./Quiz.scss";

const Quiz = ({ questions }) => {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState); //*The first case to get the
  const [showResult, setShowResult] = useState(false);
  const { question, choices, correctAnswer } = questions[currentQuestion];
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  //* update the status
  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null); //* Reset the answer
    setShowAnswerTimer(false);
    setResult((prev) =>
    finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1, //*if chose correct answers
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1, //*if chose wrong answers
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setcurrentQuestion((prev) => prev + 1);
    } else {
      setcurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true)
    });
  };
  const onTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };

  const handelTimeUp = () => {
    setAnswer(false);
    onClickNext(false);

  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
        {showAnswerTimer && <AnswerTimer duration={5} onTimeUp={handelTimeUp} />}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={answer}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={() => onClickNext (answer)} disabled={answerIdx === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions <span>{questions.length}</span>
          </p>
          <p>
            Total Score <span>{result.score}</span>
          </p>
          <p>
            Correct Answers <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onTryAgain}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
