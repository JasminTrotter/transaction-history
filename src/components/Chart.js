import React, { useEffect } from 'react';
import '../styles/App.css';
import makeD3Chart from '../make-d3-chart';

function Chart({ dataSet }) {

  useEffect(() => {
    if (dataSet) {
      dataSet.map(o => {
        o['classPackage'] = parseInt(o['package'].replace(/[classes ]/g, ''));
        o['amountPaid'] = parseInt(o['amountPaid']);
        o['date'] = new Date(o['purchaseDate'].replace(/(th)|(st)|(nd)|(rd)/g, ''));
      });

      makeD3Chart(dataSet);
    }
  });


  return (
    <div className='Chart'>
      <svg id='svg-chart'></svg>
    </div>
  );
}

export default Chart;
