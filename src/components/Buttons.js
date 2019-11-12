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
      {showLast && <a className='back' onClick={() => last()}>{'< last month'}</a>}
      {showNext && <a className='forward' onClick={() => next()}>{'next month >'}</a>}
    </div>
  );
}

export default Buttons;
