import React from 'react';

interface IForm {
  action: string;
}

function Form({ action } : IForm) {
  return (
    <form className="form" id={action.toLocaleLowerCase()}>
      <input className="form__input" id="name" type="text" placeholder="Name" autoComplete="off" />
      <input className="form__input" id="color" type="color" value="#ffffff" autoComplete="off" />
      <button className="form__btn" type="submit">{action}</button>
    </form>
  );
}

export default Form;
