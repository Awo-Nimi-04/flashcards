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
  },
  {
    difficulty: "medium",
    question: "What is the hardest natural substance on Earth?",
    answer: "Diamond",
    img: diamondImg,
  },
  {
    difficulty: "easy",
    question: "What is the largest ocean on Earth?",
    answer: "The Pacific Ocean",
    img: pacificImg,
  },
  {
    difficulty: "hard",
    question: "What is the name of the longest mountain range on Earth?",
    answer: "The Andes",
    img: andesImg,
  },
  {
    difficulty: "medium",
    question: "Who developed the theory of general relativity?",
    answer: "Albert Einstein",
    img: einsteinImg,
  },
  {
    difficulty: "easy",
    question: "Who painted the Mona Lisa?",
    answer: "Leoanrdo Da Vinci",
    img: daVinciImg,
  },
  {
    difficulty: "hard",
    question: "Who was the second president of the United States?",
    answer: "John Adams",
    img: johnAdamsImg,
  },
  {
    difficulty: "medium",
    question: "What is the smallest country in the world by land area?",
    answer: "Vatican City",
    img: vaticanImg,
  },
  {
    difficulty: "medium",
    question: "In which year did World War II end?",
    answer: "1945",
    img: ww2Img,
  },
  {
    difficulty: "hard",
    question: "Which element has the highest melting point?",
    answer: "Tungsten",
    img: tungstenImg,
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipCard = () => {
    setIsFlipped((prevState) => !prevState);
    setShowAnswer((prevState) => !prevState);
  };
  const handleNextCard = () => {
    setShowAnswer(false);
    setIsFlipped(false);
    setIndex((prevIndex) => {
      let nextIndex = prevIndex;
      while (nextIndex === prevIndex)
        nextIndex = Math.floor(Math.random() * trivia.length);
      return nextIndex;
    });
  };

  return (
    <div className="home">
      <h1>Trivia Flashcards</h1>
      <p>How good are you at trivia? Test your trivia strength here!</p>
      <p>Number of cards: {trivia.length}</p>
      <Flashcard
        question={trivia[index].question}
        answer={trivia[index].answer}
        difficulty={trivia[index].difficulty}
        show={showAnswer}
        flipped={isFlipped}
        isClicked={handleFlipCard}
        image={trivia[index].img}
      />
      <div className="naviagtion">
        <button onClick={handleNextCard}>Next</button>
      </div>
    </div>
  );
}

export default App;
