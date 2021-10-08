import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ navData }) {
  return (
    <Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          {navData[0] === "Study" ? (
            <Fragment>
              <li className="breadcrumb-item">
                <Link
                  to={`/decks/${navData[1].id}`}
                >{` ${navData[1].name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{` ${navData[0]}`}</li>
            </Fragment>
          ) : navData[0] === "Deck" ? (
            <Fragment>
              <li className="breadcrumb-item active">{` ${navData[1].name}`}</li>
            </Fragment>
          ) : navData[0] === "Edit Card" ? (
            <Fragment>
              <li className="breadcrumb-item">
                <Link
                  to={`/decks/${navData[1].id}`}
                >{` ${navData[1].name}`}</Link>
              </li>
              <li className="breadcrumb-item active">
                {navData[0]} {navData[2]}
              </li>
            </Fragment>
          ) : navData[0] === "Add Card" ? (
            <Fragment>
              <li className="breadcrumb-item">
                <Link
                  to={`/decks/${navData[1].id}`}
                >{` ${navData[1].name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{` ${navData[0]}`}</li>
            </Fragment>
          ) : navData[0] === "Edit Deck" ? (
            <Fragment>
              <li className="breadcrumb-item">
                <Link
                  to={`/decks/${navData[1].id}`}
                >{` ${navData[1].name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{` ${navData[0]}`}</li>
            </Fragment>
          ) : navData[0] === "Create Deck" ? (
            <Fragment>
              <li className="breadcrumb-item active">{` ${navData[0]}`}</li>
            </Fragment>
          ) : null}
        </ol>
      </nav>
    </Fragment>
  );
}