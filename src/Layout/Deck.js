import React, { Fragment, useEffect, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";

import { readDeck } from "../utils/api";

import ButtonDeckDelete from "./ButtonDeckDelete";
import CardList from "./CardList";
import NavBar from "./NavBar";

export default function Deck({ setUpdate, update }) {
  const [deckCurrent, editDeckCurrent] = useState();
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(editDeckCurrent)
      .catch((err) => console.log(err));
    return () => abortController.abort();
  }, [update, deckId]);

  if (deckCurrent === undefined) {
    return null;
  } else {
    return (
      <Fragment>
        <NavBar navData={["Deck", deckCurrent]}/>
        <h3>{deckCurrent.name}</h3>
        <p>{deckCurrent.description}</p>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-around">
            <Link type="button" className="btn btn-secondary m-1" to={`${url}/edit`}>
              <span className="oi oi-pencil m-1" />
              Edit
            </Link>
            <Link type="button" className="btn btn-primary m-1" to={`${url}/study`}>
              <span className="oi oi-book m-1" />
              Study
            </Link>
            <Link type="button" className="btn btn-primary m-1" to={`${url}/cards/new`}>
              <span className="oi oi-plus m-1" />
              Add Cards
            </Link>
          </div>
          <div>
            <ButtonDeckDelete deckId={deckId} setUpdate={setUpdate} update={update} />
          </div>
        </div>
        <CardList deckCurrent={deckCurrent} url={url} setUpdate={setUpdate} update={update} />
      </Fragment>
    );
  }
}