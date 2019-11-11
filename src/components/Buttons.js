import React from 'react';

function Buttons({
  last,
  next,
  showLast,
  showNext
}) {

  return (
    <>
      {showLast && <button onClick={() => last()}>last 3 months</button>}
      {showNext && <button onClick={() => next()}>next 3 months</button>}
    </>
  );
}

export default Buttons;
