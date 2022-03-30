import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const DeckWithTimer = () => {
    const [deck, setDeck] = useState(null);
    const [drawnCards, setDrawnCards] = useState([])
    const [draw, setDraw] = useState(false);
    const timerId = useRef(null);
    
    useEffect(() => {
            // Get a new deck
        const fetchNewDeck = async () => {
            try {
                const newDeck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                setDeck(newDeck.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchNewDeck();
    }, []); // runs on first render


    useEffect(() => {
        async function drawCard() {
            try {

                // handle errors if deck is null
                if(deck === null || deck.deck_id === undefined) {
                    return;
                }

                const drawRes = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?draw=1`);


                const card = drawRes.data.cards[0]; 
                
                if(drawRes.data.remaining > 0) {
                    setDrawnCards((drawn) => {
                        return [...drawn, card];
                    });
                } else {
                    alert("no cards remaining!")
                    setDraw((bool) => !bool)
                    throw new Error("no cards remaining!");
                }

            } catch (error) {
                console.error(error);
            }
        }

        if (draw === true && timerId.current === null) {
                timerId.current = setInterval( async () => {
                    await drawCard();
                }, 200);
        }

        return () => {
            console.log("cleaning up")
            clearInterval(timerId.current);
            timerId.current = null;

          };
        
    }, [draw]); // runs when draw changes

    const toggleCount = () => {
        setDraw(bool => !bool);
      };

    return (
        <div className="Deck">
            <button className="Deck-button" onClick={toggleCount}>{draw === false ? "Draw" : "stop"}</button>
            {drawnCards.map((c) => {
                return <Card key={c.code} card={c} />
            })}
        </div>
        
    )
    

}



export default DeckWithTimer;