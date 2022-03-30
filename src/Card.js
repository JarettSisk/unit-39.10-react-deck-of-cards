import React, { useState } from "react";
import "./Card.css";

const Card = ({card}) => {

    const [{angle, xPos, yPos}] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
      });
    
      const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return (
        <div className="Card">
            <img className="Card-image" src={card.image} alt={card.suit} style={{transform}}></img>
        </div>
    )
    
}

export default Card;