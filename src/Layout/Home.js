import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ButtonDeckDelete from "./ButtonDeckDelete";

import { listDecks } from "../utils/api";

export default function RenderHome() {
  const [homeDeckList, setHomeDeckList] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then(setHomeDeckList)
      .catch((err) => console.log(err));
    return () => abortController.abort();
  }, [update]);

  if (homeDeckList === undefined) {
    return null;
  } else {
    return (
      <Fragment>
        <Link type="button" className="btn btn-secondary m-1" to="/decks/new">
          <span className="oi oi-plus m-1" />
          Create Deck
        </Link>
        <hr></hr>
        {homeDeckList.map(({ id, name, description, cards }) => (
          <div className="card m-2" key={id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-quote">{`${cards.length} cards`}</h6>
              </div>
              <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-around">
                  <Link type="button" className="btn btn-secondary m-1" to={`/decks/${id}`}>
                    <span className="oi oi-eye m-1" />
                    View
                  </Link>
                  <Link type="button" className="btn btn-primary m-1" to={`/decks/${id}/study`}>
                    <span className="oi oi-book m-1" />
                    Study
                  </Link>
                </div>
                <div>
                  <ButtonDeckDelete deckId={id} setUpdate={setUpdate} update={update}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }
}