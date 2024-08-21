import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Function to start the timer
    const startTimer = () => {
      const timer = setTimeout(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            // Timer has reached 0
            clearTimeout(timer); // Clear the timeout
            onAnswered(false); // Call onAnswered with false
            return 10; // Reset time to 10 seconds for the next question
          }
          return prevTime - 1; // Decrease time by 1 second
        });
      }, 1000); // Set timeout for 1 second

      // Return cleanup function to clear the timeout
      return () => clearTimeout(timer);
    };

    // Start the timer when component mounts or timeRemaining changes
    const cleanupTimer = startTimer();

    // Clean up the timer on component unmount or before starting a new timer
    return cleanupTimer;
  }, [timeRemaining, onAnswered]); // Dependencies array

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timer when an answer is selected
    onAnswered(isCorrect); // Call the callback with the result
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={index} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
