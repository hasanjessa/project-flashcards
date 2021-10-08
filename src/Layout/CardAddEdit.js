import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { readDeck, updateCard, createCard, readCard } from "../utils/api";

import NavBar from "./NavBar";

export default function CardAddEdit({ mode, setUpdate, update }) {
  const { deckId, cardId = null } = useParams();
  const history = useHistory();
  const [deckCurrent, setDeckCurrent] = useState();
  const [cardData, setCardData] = useState({ front: "", back: "" });

  const handleCardData = ({ target }) =>
    setCardData({ ...cardData, [target.name]: target.value });

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeckCurrent)
      .catch((err) => console.log(err));
    if (cardId !== null) {
      readCard(cardId, abortController.signal)
        .then(setCardData)
        .catch((err) => console.log(err));
    }
    return () => abortController.abort();
  }, [deckId, cardId]);

  function reloadData() {
    setUpdate(!update);
  }

  const submitCard = () => {
    const abortController = new AbortController();
    if (mode === "Create") {
      createCard(deckId, { ...cardData }, abortController.signal)
        .then(reloadData())
        .catch((err) => console.log(err));
    } else {
      updateCard({ ...cardData }, abortController.signal)
        .then(reloadData())
        .catch((err) => console.log(err));
    }
    history.push(`/decks/${deckId}`);
    return () => abortController.abort();
  };

  if (cardData !== undefined && deckCurrent !== undefined) {
    return (
      <Fragment>
        {mode === "Create" ? (
          <Fragment>
            <NavBar navData={["Add Card", deckCurrent, cardId]} />
            <h2>{deckCurrent.name}: Add Card</h2>
          </Fragment>
        ) : (
          <Fragment>
            <NavBar navData={["Edit Card", deckCurrent]} />
            <h2>Edit Card</h2>
          </Fragment>
        )}
        <form>
          <div className="form-group">
            <label className="d-flex col">Front</label>
            <textarea
              className="d-flex col"
              placeholder="Front side of Card"
              name="front"
              value={cardData.front}
              onChange={handleCardData}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="d-flex col">Back</label>
            <textarea
              className="d-flex col"
              placeholder="Back side of Card"
              name="back"
              value={cardData.back}
              onChange={handleCardData}
            ></textarea>
          </div>
        </form>
        <Link
          type="button"
          className="btn btn-secondary m-1"
          to={`/decks/${deckId}`}
        >
          <span className="oi oi-circle-x m-1" />
          Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitCard}>
          <span className="oi oi-circle-check m-1" />
          {mode === "Create" ? "Save" : "Submit"}
        </button>
      </Fragment>
    );
  } else {
    return null;
  }
}