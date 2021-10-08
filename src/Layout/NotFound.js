import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Fragment>
      <div className="NotFound">
        <h2>Not Found</h2>
        <h3>Bad Things Happened</h3>
      </div>
      <Link to="/">Never Gonna Give You Up, Never Gonna Let You Go Home</Link>
    </Fragment>
  );
}