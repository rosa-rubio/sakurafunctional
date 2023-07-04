import React, { useEffect, useState } from "react";
import "./Card.css";
import ApiFetch from "../services/ApiFetch";
import { Link } from "react-router-dom";

function Card() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    ApiFetch()
      .then((data) => {
        const shuffledCards = data.slice().sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  function handleCardClick(cardId) {
    if (selectedCards.length >= 3) {
      alert("Solo se pueden seleccionar tres cartas.");
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, hidden: true } : card
      )
    );

    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, cardId]);
  }

  const refreshPage = () => window.location.reload(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

 //Función para guardar la tirada de cartas
  
  const saveReading = () => {
    if (selectedCards.length !== 3) {
      alert("Debes seleccionar tres cartas antes de guardar.");
      return;
    }

    if (!comment) {
      alert("Debes introducir un comentario antes de guardar.");
      return;
    }

    const selectedCardsData = selectedCards.map((cardId) => {
      const card = cards.find((c) => c.id === cardId);
      return {
        id: card.id,
        clowCard: card.clowCard,
        englishName: card.englishName,
        meaning: card.meaning,
      };
    });

    const readingId = selectedCards.reduce((sum, cardId) => sum + cardId, 0);
    const key = `readingData_${readingId}`;

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = String(currentDate.getFullYear() % 100).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;

    const readingData = {
      id: readingId,
      date: formattedDate,
      cards: selectedCardsData,
      comment: comment,
    };

    localStorage.setItem(key, JSON.stringify(readingData));

    closePopup();
  };

  // Función para renderizar las tres cartas seleccionadas
  function renderSelectedCards() {
    return (
      <div className="three-cards">
        {selectedCards.map((cardId) => {
          const card = cards.find((c) => c.id === cardId);
          if (card) {
            return (
              <div className="reading-card" key={card.id}>
                <img src={card.clowCard} alt="reverso de las cartas" />
                <p>{card.englishName}</p>
                <p>{card.meaning}</p>
                <p></p>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  // Función para renderizar todas las cartas
  function renderAllCards() {
    return (
      <div className="all-cards">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`each-card ${card.hidden ? "hidden" : ""}`}
            id={card.id}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              src={card.cardsReverse?.sakuraReverse}
              alt="reverso de las cartas"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="cards-cont">
      <div className="text">
        <h1>Choose three cards:</h1>
      </div>
      <div className="buttons">
        <button onClick={openPopup}>Save this reading</button>
        <button onClick={refreshPage}>New reading</button>
        <button>
          <Link to="/Favorites">Go to favorites</Link>
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>How do you feel?</h2>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="popup-buttons">
              <button onClick={saveReading}>Save</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {renderSelectedCards()}
      {renderAllCards()}
    </div>
  );
}

export default Card;
