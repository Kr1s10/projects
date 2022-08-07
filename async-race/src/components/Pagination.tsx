import React, { useEffect, useState } from 'react';

interface IPag {
  page: number,
  change: (value: number) => void,
  updateState: () => void,
  count: number,
  limit: number
}

function Pagination({
  page, change, updateState, count, limit,
}: IPag) {
  const initPrev = page < 2;
  const initNext = page > Math.ceil(count / limit);
  const [prevDisabled, setPrevDisabled] = useState(initPrev);
  const [nextDisabled, setNextDisabled] = useState(initNext);

  const prevBtnHandler = () => {
    change(page - 1);
    if (page < 2) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    updateState();
  };

  const nextBtnHandler = () => {
    change(page + 1);
    if (page >= Math.ceil(count / limit)) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    updateState();
  };

  // useEffect(() => {
  //   updateState();
  // }, []);

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
      <span>{page}</span>
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
