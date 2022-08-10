import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../types/constants';

function Navigation() {
  return (
    <header className="wrapper header">
      <nav className="nav">
        <Link className="link" to="/">
          <button className="nav__btn" type="button">Garage</button>
        </Link>
        <Link className="link" to={`/${Page.winners}`}>
          <button className="nav__btn" type="button">Winners</button>
        </Link>
      </nav>
    </header>
  );
}

export default Navigation;
