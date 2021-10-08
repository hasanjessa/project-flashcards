import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import View from "./View";
import DeckCreate from "./DeckCreate";

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/">
            <View />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}