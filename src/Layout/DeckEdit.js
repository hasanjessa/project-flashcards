import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import { readDeck, updateDeck } from "../utils/api";

import NavBar from "./NavBar";

export default function DeckEdit({ setUpdate, update }) {
  // Need to add local state for Form Updates
  const { deckId = null } = useParams();
  const history = useHistory();
  const [deckCurrent, setDeckCurrent] = useState({ name: "", description: "" });

  const handleDeckData = ({ target }) =>
    setDeckCurrent({ ...deckCurrent, [target.name]: target.value });

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId !== null) {
      readDeck(deckId, abortController.signal)
        .then(setDeckCurrent)
        .catch((err) => console.log(err));
    }
    return () => abortController.abort();
  }, [deckId]);

  function reloadData() {
    setUpdate(!update);
  }

  const submitDeck = () => {
    const abortController = new AbortController();
      updateDeck({ ...deckCurrent }, abortController.signal)
        .then(reloadData())
        .then(history.push(`/decks/${deckId}`))
        .catch((err) => console.log(err));
    return () => abortController.abort();
  };

  if (deckCurrent !== undefined) {
    return (
      <Fragment>
          <NavBar navData={["Edit Deck", deckCurrent]} />
        <h2>Edit Deck</h2>
        <form>
          <div className="form-group">
            <label className="d-flex col">Name</label>
            <textarea
              className="d-flex col"
              placeholder="Deck Name"
              name="name"
              value={deckCurrent.name}
              onChange={handleDeckData}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="d-flex col">Description</label>
            <textarea
              className="d-flex col"
              placeholder="Brief description of the deck"
              name="description"
              value={deckCurrent.description}
              onChange={handleDeckData}
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
        <button className="btn btn-primary m-1" onClick={submitDeck}>
          <span className="oi oi-circle-check m-1" />
          Submit
        </button>
      </Fragment>
    );
  } else {
    return null;
  }
}