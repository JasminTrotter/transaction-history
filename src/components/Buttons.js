import React from 'react';
import '../styles/Buttons.css';

function Buttons({
  last,
  next,
  showLast,
  showNext
}) {

  return (
    <div className='Buttons'>
      <button className='back' disabled={!showLast} onClick={() => last()}>{'< last month'}</button>
      <button className='forward' disabled={!showNext} onClick={() => next()}>{'next month >'}</button>
    </div>
  );
}

export default Buttons;
