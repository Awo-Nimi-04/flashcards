import { useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";

import parisImg from "./assets/paris.jpg";
import diamondImg from "./assets/diamonds.png";
import pacificImg from "./assets/pacificOcean.jpg";
import andesImg from "./assets/TheAndes.jpg";
import einsteinImg from "./assets/albertEinstein.jpeg";
import daVinciImg from "./assets/leonardoDaVinci.jpg";
import johnAdamsImg from "./assets/johnAdams.jpeg";
import vaticanImg from "./assets/vatican.jpeg";
import ww2Img from "./assets/1945.jpeg";
import tungstenImg from "./assets/tungsten.jpeg";

const trivia = [
  {
    difficulty: "easy",
    question: "What is the capital of France?",
    answer: "Paris",
    img: parisImg,
    possibleAnswers: ["paris"],
    visited: false,
  },
  {
    difficulty: "medium",
    question: "What is the hardest natural substance on Earth?",
    answer: "Diamond",
    img: diamondImg,
    possibleAnswers: ["diamond", "diamonds"],
    visited: false,
  },
  {
    difficulty: "easy",
    question: "What is the largest ocean on Earth?",
    answer: "The Pacific Ocean",
    img: pacificImg,
    possibleAnswers: [
      "pacific",
      "the pacific",
      "the pacific ocean",
      "pacific ocean",
    ],
    visited: false,
  },
  {
    difficulty: "hard",
    question: "What is the name of the longest mountain range on Earth?",
    answer: "The Andes",
    img: andesImg,
    possibleAnswers: [
      "the andes",
      "andes",
      "andes mountains",
      "andes mountain range",
      "the andes mountains",
      "the andes mountain range",
    ],
    visited: false,
  },
  {
    difficulty: "medium",
    question: "Who developed the theory of general relativity?",
    answer: "Albert Einstein",
    img: einsteinImg,
    possibleAnswers: [
      "albert einstein",
      "einstein",
      "a. einstein",
      "a einstein",
    ],
    visited: false,
  },
  {
    difficulty: "easy",
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo Da Vinci",
    img: daVinciImg,
    possibleAnswers: [
      "da vinci",
      "davinci",
      "leonardo da vinci",
      "l. da vinci",
      "l da vinci",
    ],
    visited: false,
  },
  {
    difficulty: "hard",
    question: "Who was the second president of the United States?",
    answer: "John Adams",
    img: johnAdamsImg,
    possibleAnswers: [
      "john adams",
      "john q. adams",
      "john q adams",
      "president john adams",
      "president adams",
      "john quincy adams",
      "quincy adams",
    ],
    visited: false,
  },
  {
    difficulty: "medium",
    question: "What is the smallest country in the world by land area?",
    answer: "Vatican City",
    img: vaticanImg,
    possibleAnswers: ["the vatican", "vatican city", "vatican"],
    visited: false,
  },
  {
    difficulty: "medium",
    question: "In which year did World War II end?",
    answer: "1945",
    img: ww2Img,
    possibleAnswers: ["1945", "'45"],
    visited: false,
  },
  {
    difficulty: "hard",
    question: "Which element has the highest melting point?",
    answer: "Tungsten",
    img: tungstenImg,
    possibleAnswers: ["tungsten", "wolfram"],
    visited: false,
  },
];

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [maxStreak, setMaxStreak] = useState(null);
  const [streak, setStreak] = useState(0);
  const [isGuessCorrect, setIsGuessCorrect] = useState(null);
  const [cardList, setCardList] = useState([...trivia]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [guess, setGuess] = useState("");

  const handleFlipCard = () => {
    if (isSubmitted) {
      setIsFlipped((prevState) => !prevState);
      setShowAnswer((prevState) => !prevState);
    }
  };
  const handleNextCard = () => {
    setGuess("");
    setShowAnswer(false);
    setIsFlipped(false);
    setIsGuessCorrect(null);
    setIndex((prevIndex) =>
      prevIndex + 1 < trivia.length ? prevIndex + 1 : trivia.length - 1
    );
    setIsSubmitted(
      index + 1 < trivia.length
        ? cardList[index + 1].visited
        : cardList[trivia.length - 1].visited
    );
  };

  const handlePrevCard = () => {
    setGuess("");
    setShowAnswer(false);
    setIsFlipped(false);
    setIsGuessCorrect(null);
    setIndex((prevIndex) => (prevIndex - 1 > 0 ? prevIndex - 1 : 0));
    setIsSubmitted(
      index - 1 > 0 ? cardList[index - 1].visited : cardList[0].visited
    );
  };

  const handleShuffleCards = () => {
    const shuffled = [];
    const set = new Set();
    while (set.size < trivia.length) {
      const randomIndex = Math.floor(Math.random() * trivia.length);
      if (!set.has(randomIndex)) {
        trivia[randomIndex].visited = false;
        shuffled.push(trivia[randomIndex]);
        set.add(randomIndex);
      }
    }
    setCardList(shuffled);
    setIsGuessCorrect(null);
    setGuess("");
    setIndex(0);
    setShowAnswer(false);
    setIsFlipped(false);
    setStreak(0);
    setMaxStreak((prevState) => (prevState > streak ? prevState : streak));
    setIsSubmitted(false);
  };

  const handleInputChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmitGuess = () => {
    cardList[index].visited = true;
    const res = cardList[index].possibleAnswers.includes(guess.toLowerCase());
    setIsGuessCorrect(res);
    setStreak(res ? streak + 1 : 0);
    setMaxStreak((prevState) =>
      res ? prevState : prevState > streak ? prevState : streak
    );
    setIsSubmitted(true);
  };

  return (
    <div className="home">
      <h1>Trivia Flashcards</h1>
      <p>How good are you at trivia? Test your trivia strength here!</p>
      <p>Number of cards: {trivia.length}</p>
      <p>
        Current streak: {streak} | Longest Streak: {maxStreak}
      </p>
      <Flashcard
        question={cardList[index].question}
        answer={cardList[index].answer}
        difficulty={cardList[index].difficulty}
        show={showAnswer}
        flipped={isFlipped}
        isClicked={handleFlipCard}
        image={cardList[index].img}
      />
      <div className="guess">
        <label>Guess the answer here:</label>
        <input
          className={`${
            isGuessCorrect === null ? "" : isGuessCorrect ? "correct" : "wrong"
          }`}
          type="text"
          value={guess}
          onChange={handleInputChange}
        />
        <button disabled={cardList[index].visited} onClick={handleSubmitGuess}>
          Submit Guess
        </button>
      </div>
      <div className="naviagtion">
        <button onClick={handlePrevCard}>Back</button>
        <button onClick={handleNextCard}>Next</button>
        <button onClick={handleShuffleCards}>Shuffle</button>
      </div>
    </div>
  );
}

export default App;
