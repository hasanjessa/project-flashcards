import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export default function ButtonDeckDelete({ deckId, setUpdate, update }) {
  const history = useHistory();
  const BtnDelete = () => {
    const windowText =
      "Delete this Deck?\n\nYou will not be able to recover it.";
    if (window.confirm(windowText)) {
      function reloadDecks() {
        setUpdate(!update);
        history.push("/");
      }
      const abortController = new AbortController();
      deleteDeck(deckId, abortController.signal)
        .then(reloadDecks())
        .catch((err) => console.log(err));
      return () => abortController.abort();
    }
  };

  return (
    <Fragment>
      <button type="button" className="btn btn-danger m-1" onClick={BtnDelete}>
        <span className="oi oi-trash m-1" />
      </button>
    </Fragment>
  );
}