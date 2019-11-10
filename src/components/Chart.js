import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/App.css';
import makeD3Chart from '../make-d3-chart';

function Chart({
  dataSet,
  earliest,
  latest
}) {

  console.log('chart earliest', earliest._d)
  console.log('chart latest', latest._d)

  useEffect(() => {
    console.log('chart data', dataSet)
    if (dataSet && dataSet.length) {
      d3.select('#svg-chart')
        .selectAll('g')
        .remove();

      makeD3Chart(dataSet, earliest._d, latest._d);
    }

  });


  return (
    <div className='Chart'>
      <svg id='svg-chart'></svg>
    </div>
  );
}

export default Chart;
