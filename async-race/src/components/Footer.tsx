import React from 'react';
import GhLogo from './svg/GhLogo';
import RSSchoolLogo from './svg/RSSchoolLogo';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <a className="footer__link" href="https://rs.school/js/">
          <RSSchoolLogo />
        </a>
        <span className="year">Created in 2022</span>
        <a className="footer__link" href="https://github.com/Kr1s10">
          <GhLogo />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
