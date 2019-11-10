import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/App.css';
import makeD3Chart from '../make-d3-chart';

function Chart({
  dataSet,
  begin,
  end
}) {

  useEffect(() => {
    if (dataSet && dataSet.length) {
      d3.select('#svg-chart')
        .selectAll('g')
        .remove();

      makeD3Chart(dataSet, begin._d, end._d);
    }

  });

  return (
    <>
      <svg id='svg-chart'></svg>
    </>
  );
}

export default Chart;
