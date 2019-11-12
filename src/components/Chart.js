import React, { useEffect } from 'react';
import * as d3 from 'd3';
import '../styles/Chart.css';
import makeD3Chart from '../make-d3-chart';

function Chart({
  rawDataSeries,
  dataSet,
  begin,
  end,
  rawData,
  selectedDataSeries
}) {

  useEffect(() => {
    if (dataSet && dataSet.length) {
      d3.select('#svg-chart')
        .selectAll('g')
        .remove();

      makeD3Chart(dataSet, begin._d, end._d, rawData, rawDataSeries, selectedDataSeries);
    }

  });

  return (
    <div className='viewport-flexible-wrapper'>
      <div className='svg-wrapper'>
        <div className='Chart'>
          <svg id='svg-chart' className='svg-chart'></svg>
        </div>
      </div>
    </div>
  );
}

export default Chart;
