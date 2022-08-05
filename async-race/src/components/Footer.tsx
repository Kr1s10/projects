import React from 'react';
import GhLogo from './svg/GhLogo';
import RSSchoolLogo from './svg/RSSchoolLogo';

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <a href="https://rs.school/js/">
          <RSSchoolLogo />
        </a>
        <span className="year">Created in 2022</span>
        <a href="https://github.com/Kr1s10">
          <GhLogo />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
