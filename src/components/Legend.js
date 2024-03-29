import React from 'react';
import '../styles/Legend.css';

function Legend() {

  return (
    <div className='Legend' style={{ borderTop: '3px solid #349EDB' }}>
      <section>
        <div className='legend-container'>
          <div className='legend'>
            <p>Daily Revenue</p><hr style={{ backgroundColor: '#CC8E83' }}></hr>
          </div>
          <div className='legend'>
            <p>Classes Purchased</p><hr style={{ backgroundColor: '#349EDB' }}></hr>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Legend;
