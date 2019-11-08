import * as d3 from 'd3';

export default function makeD3Chart(data) {
  // var node = document.createElement('div');
  const width = 1000;
  const height = 500;
  const margin = { top: 30, right: 50, bottom: 30, left: 30 };
  const series = dataSet => {
    const arr = [];
    const arr0 = []
    const arr1 = []

    dataSet.forEach(d => {
      const o1 = {
        key: 'classPackage',
        value: d['classPackage'],
        date: d['date']
      };
      const o2 = {
        key: 'amountPaid',
        value: d['amountPaid'],
        date: d['date']
      };

      arr0.push(o1);
      arr1.push(o2);
    })

    arr[0] = arr0
    arr[1] = arr1

    console.log('arr', arr);
    return arr;
  }

  const x = d3.scaleUtc()
    .domain([data[0].date, data[data.length - 1].date])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(series, s => d3.max(s, d => d.classPackage))])
    .range([height - margin.bottom, margin.top]);

  const z = d3.scaleOrdinal(data.columns.slice(1), d3.schemeCategory10);

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  svg.append('g')
    .call(xAxis);

  const serie = svg.append('g')
    .selectAll('g')
    .data(series(data))
    .join('g');

  serie.append('path')
    .attr('fill', 'none')
    .attr('stroke', d => z(d[0].key))
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
      .x(d => x(d.date))
      .y(d => y(d.classPackage)));

  serie.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(d => d)
    .join('text')
    .text(d => d.classPackage)
    .attr('dy', '0.35em')
    .attr('x', d => x(d.date))
    .attr('y', d => y(d.classPackage))
    .call(text => text.filter((d, i, data) => i === data.length - 1)
      .append('tspan')
      .attr('font-weight', 'bold')
      .text(d => ` ${d.key}`))
    .clone(true).lower()
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6);

  return svg.node();
}
