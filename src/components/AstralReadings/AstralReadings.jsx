import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Astral.css";
import Cart from "../../assets/cartas-favotires.svg";
import Back from "../../assets/back.svg";

function AstralReadings() {
  const [readingData, setReadingData] = useState(null);
  const [editedComments, setEditedComments] = useState({});

  useEffect(() => {
    const fetchReadingData = () => {
      const storedReadingData = Object.keys(localStorage)
        .filter((key) => key.startsWith("readingData_"))
        .map((key) => JSON.parse(localStorage.getItem(key)));
      setReadingData(storedReadingData);
    };

    fetchReadingData();
  }, []);

  const handleDeleteReading = (index) => {
    const updatedData = readingData.filter((_, i) => i !== index);
    setReadingData(updatedData);

    const readingDataKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("readingData_")
    );
    const readingDataKeyToDelete = readingDataKeys[index];
    localStorage.removeItem(readingDataKeyToDelete);

    // Actualizar los índices en localStorage
    for (let i = index + 1; i < readingDataKeys.length; i++) {
      const currentReadingDataKey = readingDataKeys[i];
      const newReadingDataKey = `readingData_${i - 1}`;
      const readingDataToMove = localStorage.getItem(currentReadingDataKey);
      localStorage.removeItem(currentReadingDataKey);
      localStorage.setItem(newReadingDataKey, readingDataToMove);
    }
};

const handleSaveComment = (index) => {
  const updatedData = [...readingData];
  updatedData[index] = { ...updatedData[index], comment: editedComments[index] };
  setReadingData(updatedData);
  localStorage.setItem(`readingData_${index}`, JSON.stringify(updatedData[index]));
  setEditedComments((prevEditedComments) => {
    const updatedComments = { ...prevEditedComments };
    delete updatedComments[index];
    return updatedComments;
  });
};

const handleEditComment = (index) => {
  const commentToEdit = readingData[index].comment;
  setEditedComments((prevEditedComments) => ({ ...prevEditedComments, [index]: commentToEdit }));
};

  return (
    <div className="main-reading">
      <img src={Cart} className="cart-bw" alt="Carta que aparece en la parte inferior del navbar" />

      <div className="store-readings">
        {readingData &&
          readingData.map((data, index) => (
            <div key={index}>
              <div>
                <button onClick={() => handleDeleteReading(index)}>Eliminar</button>
                {editedComments[index] !== undefined ? (
                  <button onClick={() => handleSaveComment(index)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEditComment(index)}>Editar</button>
                )}
              </div>
              <hr></hr>
              <p>Date: {data.date}</p>
              <p>
                Comment:{" "}
                {editedComments[index] !== undefined ? (
                  <input
                    type="text"
                    value={editedComments[index]}
                    onChange={(e) =>
                      setEditedComments({
                        ...editedComments,
                        [index]: e.target.value,
                      })
                    }
                  />
                ) : (
                  <span>{data.comment}</span>
                )}
              </p>
              <div className="cards-container">
                {data.cards.map((card) => (
                  <div className="reading-card" key={card.id}>
                    <img src={card.clowCard} alt="reverso de las cartas" />
                    <p>{card.englishName}</p>
                    <p>{card.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <Link to="/Main" className="comeback">
        <img src={Back} className="back" alt="link para volver atras" />
        Back
      </Link>
    </div>
  );
}

export default AstralReadings;
