import * as d3 from 'd3';
import {
  constructSeries,
  getDisplayValue,
  getDomainMax,
  getTooltipText,
  getDisplayColor
} from './utils';

export default function makeD3Chart(earliestTime, latestTime, wholeData) {
  const width = 5000;
  const height = 2000;
  const margin = { top: 30, right: 100, bottom: 80, left: 100 };
  const series = constructSeries(wholeData);

  const x = d3.scaleTime()
    .range([margin.left, width - margin.right])
    .domain([earliestTime, latestTime])
    .nice()

  const y = d3.scaleLinear()
    .domain([0, getDomainMax(series)])
    .range([height - margin.bottom, margin.top]);

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(4));

  const svg = d3.select('#svg-chart')
    .attr('viewBox', [0, 0, width, height]);

  svg.append('g')
    .call(xAxis);

  const serie = svg.append('g')
    .selectAll('g')
    .data(series)
    .join('g');

  const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  serie.append('path')
    .attr('fill', 'none')
    .attr('stroke', d => getDisplayColor(d))
    .attr('stroke-width', 5)
    .attr('d', d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value)));

  serie.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 75)
    .attr('cursor', 'pointer')
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(d => d)
    .join('text')
    .text(d => getDisplayValue(d))
    .on('mouseover', (d) => {
      div.transition()
        .duration(200)
        .style('opacity', .9);
      div.html(getTooltipText(d))
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY - 28) + 'px');
    })
    .on('mouseout', () => {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    })
    .attr('dy', '0.35em')
    .attr('x', d => x(d.date))
    .attr('y', d => y(d.value))
    .clone(true).lower()
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6);

}
