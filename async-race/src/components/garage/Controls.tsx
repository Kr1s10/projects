import React from 'react';

function Controls() {
  return (
    <div className="controls">
      <button className="controls__btn" id="race" type="button">Race</button>
      <button className="controls__btn" id="reset" type="button">Reset</button>
      <button className="controls__btn" id="generate" type="button">Generate</button>
    </div>
  );
}

export default Controls;
