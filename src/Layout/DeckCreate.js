import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../utils/api";

import NavBar from "./NavBar";

export default function DeckCreate() {
  const history = useHistory();
  const [deckCurrent, setDeckCurrent] = useState({ name: "", description: "" });

  const handleDeckData = ({ target }) =>
    setDeckCurrent({ ...deckCurrent, [target.name]: target.value });

  const submitDeck = () => {
    const abortController = new AbortController();
    createDeck({ ...deckCurrent }, abortController.signal)
      .then(history.push(`/`))
      .catch((err) => console.log(err));
    return () => abortController.abort();
  };

  if (deckCurrent !== undefined) {
    return (
      <Fragment>
          <NavBar navData={["Create Deck"]}/>
        <h2>Create Deck</h2>
        <form>
          <div className="form-group">
            <label className="d-flex col">Name</label>
            <input
              className="d-flex col"
              placeholder="Deck Name"
              name="name"
              value={deckCurrent.name}
              onChange={handleDeckData}
            ></input>
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
        <Link type="button" className="btn btn-secondary m-1" to={`/`}>
          <span className="oi oi-circle-x m-1" />
          Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitDeck}>
          <span className="oi oi-circle-check m-1" />
          Save
        </button>
      </Fragment>
    );
  } else {
    return null;
  }
}