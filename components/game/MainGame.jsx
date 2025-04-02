"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import GameOver from "./GameOver";
import confetti from "canvas-confetti";
import winningTone from "@/public/sounds/winning-tone.wav";

export default function MainGame() {
  const cards = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2XEWvyObeMa70CJxSbM-Uku9WoNMGF0wxprkupywonkBr7UylJTLiDczs_V2sg3L6idQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2XEWvyObeMa70CJxSbM-Uku9WoNMGF0wxprkupywonkBr7UylJTLiDczs_V2sg3L6idQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrT7MI9fsrc6mWRBJBwhrf4vwTL7S5B8CzQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrT7MI9fsrc6mWRBJBwhrf4vwTL7S5B8CzQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpOSNsm5z0BZ0Wn519jqePktwii0qVWkaKAc2nOmWtpJ59U7fEkezov7llecZNwh4aeI&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmpOSNsm5z0BZ0Wn519jqePktwii0qVWkaKAc2nOmWtpJ59U7fEkezov7llecZNwh4aeI&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    "https://global.discourse-cdn.com/twitter/original/2X/9/9863c5060f0bb427b301719db4d0cc5c5a5f0e68.JPG",
    "https://global.discourse-cdn.com/twitter/original/2X/9/9863c5060f0bb427b301719db4d0cc5c5a5f0e68.JPG",
  ];

  ///////////// HELPER FUNCTION /////////////

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  ///////////// SETUP /////////////

  const [cardList, setCardList] = useState([]);

  // this for Solving the problem of changing values ​​between server and client side in this step
  useEffect(() => {
    // put the new values when the component run on the client side
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false,
        };
      })
    );
  }, []);

  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  ///////////// GAME LOGIC /////////////

  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index,
    };

    //update card is flipped
    let updateCards = cardList.map((card) => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    //if 2 cards are flipped, check if they are a match
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 750);
    }
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name == flippedCards[1].name &&
      flippedCards[0].index != flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  const isGameOver = () => {
    let done = true;

    cardList.forEach((card) => {
      if (!card.matched) {
        done = false;
      }
    });

    setTimeout(() => {
      setGameOver(done);
    }, 1500);
  };

  ///////////// RESTART - REDO SETUP /////////////

  const restartGame = () => {
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name,
          flipped: false,
          matched: false,
        };
      })
    );

    setFlippedCards([]);
    setGameOver(false);
  };

  ///////////// Confetti Effect and sound /////////////
  function startConfetti() {
    const colors = ["#bb0000", "#ffffff"];

    let time = 1;

    setInterval(() => {
      if (time < 250) {
        time += 1;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
      }
    }, 15);
  }

  function playSound() {
    new Audio(winningTone).play();
  }

  useEffect(() => {
    if (gameOver) {
      startConfetti();
      playSound();
    }
  }, [gameOver]);

  ///////////// display /////////////

  return (
    <div className="game-style mt-6 mx-3">
      {/* title */}
      <div>
        <h1 className="title" data-text="FLIP CARDS">
          FLIP CARDS
        </h1>
      </div>

      {/* content */}
      {!gameOver && (
        <div
          className="game-board grid grid-cols-3 md:grid-cols-4  gap-3 mt-7"
          style={{
            animation: !gameOver ? "scale-appear 2s forwards" : "",
          }}
        >
          {cardList.map((card, index) => (
            <Card
              key={index}
              id={index}
              name={card.name}
              flipped={card.flipped}
              matched={card.matched}
              clicked={flippedCards.length === 2 ? () => {} : handleClick}
            />
          ))}
        </div>
      )}
      {gameOver && <GameOver restartGame={restartGame} />}
    </div>
  );
}
