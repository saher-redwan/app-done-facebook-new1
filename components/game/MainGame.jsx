"use client";

import React, { useEffect, useRef, useState } from "react";
import { cardImageLinks_Game as cards } from "@/lib/utils";
import Card from "./Card";
import GameOver from "./GameOver";
import confetti from "canvas-confetti";

export default function MainGame() {
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
  function startConfettiEffects() {
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

  const soundRef = useRef();

  // this for load the audio at the beginning of the page
  // This step (isMuted) solves the problem of rigidity in the element.
  const [isMuted, setIsMuted] = useState(true);

  function playSound() {
    setIsMuted(false);
    soundRef.current.play();
  }

  useEffect(() => {
    if (gameOver) {
      startConfettiEffects();
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

      {/* cards */}
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

      {/* gameOver */}
      {gameOver && <GameOver restartGame={restartGame} />}

      {/* to load the audio on mount the page, so we can somthly play it with the game effects */}
      <audio
        src="/sounds/winning-tone_bfK5hxxG321.wav"
        autoPlay
        preload="auto"
        muted={isMuted}
        ref={soundRef}
      />
    </div>
  );
}
