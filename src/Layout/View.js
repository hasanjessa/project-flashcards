import React, { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";

import DeckEdit from "./DeckEdit";
import Deck from "./Deck";
import Study from "./Study";
import CardAddEdit from "./CardAddEdit";

export default function View() {
  const [update, setUpdate] = useState(false);
  return (
    <Fragment>
      <Switch>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <CardAddEdit mode={"Edit"} setUpdate={setUpdate} update={update} />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <CardAddEdit mode={"Create"} setUpdate={setUpdate} update={update} />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <DeckEdit setUpdate={setUpdate} update={update} />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck setUpdate={setUpdate} update={update} />
        </Route>
      </Switch>
    </Fragment>
  );
}