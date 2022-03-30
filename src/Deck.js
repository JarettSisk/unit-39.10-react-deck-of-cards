import React, {useState, useEffect} from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const Deck = () => {
    console.log("...................................");
    console.log("component rendering...");

    const [deck, setDeck] = useState(null);
    // const [drawnCards, setDrawnCards] = useState([]);
    const [drawnCards, setDrawnCards] = useState([])
    const [buttonClick, setButtonClick] = useState(false);
 

    useEffect(() => {
        console.log("useEffect running...")
            // Get a new deck
        const fetchNewDeck = async () => {
            try {
                console.log('fetchNewDeck Function...');
                const newDeck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                setDeck(newDeck.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchNewDeck();
    }, []); // runs on first render


    useEffect(() => {
        console.log("useEffect running...")

        const drawCard = async () => {
            try {
                console.log('drawCard Function...');
                // handle errors if deck is null
                if(deck === null || deck.deck_id === undefined) {
                    return;
                }

                const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);

                console.log(`Remaining cards: ${res.data.remaining}`); // log remaining cards

                // If no remaing cards, throw error
                if (res.data.remaining === 0) {
                    alert("no cards remaining!");
                    throw new Error("no cards remaining!");
                }

                let newDrawnCardsArr = [ ...drawnCards, res.data.cards[0]];
                setDrawnCards(newDrawnCardsArr)

            } catch (error) {
                console.error(error);
            }
        }
        drawCard();
    }, [buttonClick]); // runs on button click

    

    return (
        <div className="Deck">
            <button className="Deck-button" onClick={() => setButtonClick(!buttonClick)}>Draw</button>
            {drawnCards.map((c, idx) => {
                return <Card key={idx} card={c} />
            })}
        </div>
        
    )
    

}



export default Deck;