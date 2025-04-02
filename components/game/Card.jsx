const Card = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={
        "card" + (flipped ? " flipped" : "") + (matched ? " matched" : "")
      }
    >
      <div className="back">?</div>
      <div className="front">
        <img src={name} />
      </div>
    </div>
  );
};
export default Card;
