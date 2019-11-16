import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Chart.css';
import makeD3Chart from '../make-d3-chart';

function Chart({
  dataSet,
  begin,
  end,
  wholeDataSet
}) {

  useEffect(() => {
    if (dataSet && dataSet.length) {
      d3.select('#svg-chart')
        .selectAll('g')
        .remove();

      makeD3Chart(begin._d, end._d, wholeDataSet);
    }

  });

  return (
    <div className='svg-wrapper'>
      <div className='Chart'>
        <svg id='svg-chart' className='svg-chart'></svg>
      </div>
    </div>
  );
}

export default Chart;
