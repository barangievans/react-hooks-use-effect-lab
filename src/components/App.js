import React, { useState, useEffect } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz); // State for questions
  const [currentQuestionId, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  useEffect(() => {
    // Example: Fetch new questions from an API or update questions
    const fetchQuestions = async () => {
      // Simulate an API call
      const newQuestions = await new Promise((resolve) =>
        setTimeout(() => resolve(quiz), 1000) // Using the same quiz data for demo
      );
      setQuestions(newQuestions); // Update questions state
    };

    fetchQuestions();
  }, []); // Empty dependency array means this runs once after the initial render

  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      setCurrentQuestion((prevId) => prevId + 1);
    } else {
      setCurrentQuestion(null);
    }
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
