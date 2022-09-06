import React from 'react';
import GhLogo from '../../assets/svg/GhLogo';
import RSSchoolLogo from '../../assets/svg/RSSchoolLogo';

export default function Footer() {
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
