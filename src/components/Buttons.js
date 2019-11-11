import React from 'react';
import '../styles/Buttons.css';

function Buttons({
  last,
  next,
  showLast,
  showNext
}) {

  return (
    <>
      {showLast && <button className='back' onClick={() => last()}>back 1 month</button>}
      {showNext && <button className='forward' onClick={() => next()}>forward 1 month</button>}
    </>
  );
}

export default Buttons;
