import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";

import { readDeck } from "../utils/api";

import NavBar from "./NavBar";

export default function Study() {
  const [cardState, setCardState] = useState([true, 0]);
  const [deckCurrent, editDeckCurrent] = useState();
  const { url } = useRouteMatch();
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(editDeckCurrent)
      .catch((err) => console.log(err));
    return () => abortController.abort();
  }, [deckId]);

  if (deckCurrent === undefined) {
    return null;
  } else {
    const studyDecline = `You need at least 3 cards to study. There are ${deckCurrent.cards.length} cards in this deck.`;
    const studyConfirm = `Restart cards?\n\nClick 'cancel' to return to the home page.`;

    return (
      <Fragment>
        <NavBar navData={["Study", deckCurrent]}/>
        <section className="container">
          <h1>Study: {deckCurrent.name}</h1>
          {deckCurrent.cards.length < 3 ? (
            <div>
              <h2>Not enough cards.</h2>
              <p>{studyDecline}</p>
              <Link
                className="btn btn-primary"
                to={`/decks/${deckId}/cards/new`}
              >
                <span className="oi oi-plus m-1" />
                Add Cards
              </Link>
            </div>
          ) : (
            <div className="card" key={cardState[1]}>
              <div className="card-body">
                <h5 className="card-title">
                  Card {`${cardState[1] + 1} of ${deckCurrent.cards.length}`}
                </h5>
                {cardState[0] ? (
                  <p className="card-text">
                    {deckCurrent.cards[cardState[1]].front}
                  </p>
                ) : (
                  <p className="card-text">
                    {deckCurrent.cards[cardState[1]].back}
                  </p>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => setCardState([!cardState[0], cardState[1]])}
                >
                  <span className="oi oi-loop-circular m-1" />
                  Flip
                </button>
                {!cardState[0] ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (cardState[1] === deckCurrent.cards.length - 1) {
                        if (window.confirm(studyConfirm)) {
                          setCardState([true, 0]);
                        } else {
                          history.push("/");
                        }
                      } else {
                        setCardState([true, cardState[1] + 1]);
                      }
                    }}
                  >
                    <span className="oi oi-arrow-thick-right m-1" />
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </section>
      </Fragment>
    );
  }
}