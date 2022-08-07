import React, { useEffect, useState } from 'react';

interface IPag {
  page: number,
  change: (value: number) => void,
  updateState: () => void,
  limit: number,
  length: number
}

function Pagination({
  page, change, updateState, limit, length,
}: IPag) {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const prevBtnHandler = () => {
    change(page - 1);
    updateState();
  };

  const nextBtnHandler = () => {
    change(page + 1);
    updateState();
  };

  useEffect(() => {
    setPrevDisabled(page < 2);
    setNextDisabled((length < limit));
  }, [length, limit, page]);

  return (
    <div className="pag">
      <button
        className="pag__btn"
        id="prev"
        type="button"
        onClick={prevBtnHandler}
        disabled={prevDisabled}
      >
        PREV
      </button>
      <button
        className="pag__btn"
        id="next"
        type="button"
        onClick={nextBtnHandler}
        disabled={nextDisabled}
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
