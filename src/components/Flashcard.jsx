const Flashcard = ({
  question,
  answer,
  difficulty,
  flipped,
  show,
  isClicked,
  image,
}) => {
  return (
    <div
      className={`flashcard ${difficulty} ${flipped ? "is-flipped" : ""}`}
      onClick={isClicked}
    >
      {!show && <h2 className="front">{question}</h2>}
      {show && (
        <div className="back">
          <h2>{answer}</h2>
          <img src={image} alt="" />
        </div>
      )}
    </div>
  );
};

export default Flashcard;
