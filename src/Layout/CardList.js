import React, { Fragment } from "react";
import ButtonCardDelete from "./ButtonCardDelete";
import { Link } from "react-router-dom";

export default function CardList({ deckCurrent, url, setUpdate, update }) {
  return (
    <Fragment>
      <h2 className="m-2">Cards</h2>
      {deckCurrent.cards.map(({ id, front, back }) => (
        <div className="card m-2" key={id}>
          <div className="card-body">
            <div className="card-subtitle d-flex justify-content-between">
              <p className="d-flex col-6">{front}</p>
              <p className="d-flex col-6">{back}</p>
            </div>
            <div className="d-flex justify-content-end">
              <Link type="button" className="btn btn-secondary m-1" to={`${url}/cards/${id}/edit`}>
                <span className="oi oi-pencil m-1" />
                Edit
              </Link>
              <ButtonCardDelete id={id} setUpdate={setUpdate} update={update} />
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}