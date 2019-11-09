import * as d3 from 'd3';

export default function makeD3Chart(data) {
  const width = 5000;
  const height = 500;
  const margin = { top: 30, right: 50, bottom: 30, left: 30 };
  const series = [];
  const classPackages = [];
  const amountPaids = [];

  let classesPurchasedItem;
  let amountPaidItem;

  // dedupe for the series
  data.forEach((currentItem) => {

    if (classesPurchasedItem && classesPurchasedItem.date && classesPurchasedItem.date.getTime() === currentItem.date.getTime()) {
      classesPurchasedItem.value = classesPurchasedItem.value + currentItem.classPackage;
    } else {

      if (classesPurchasedItem) classPackages.push(classesPurchasedItem);

      classesPurchasedItem = {};
      classesPurchasedItem.key = 'Classes Purchased';
      classesPurchasedItem.date = currentItem.date;
      classesPurchasedItem.value = currentItem.classPackage;
    }

    if (amountPaidItem && amountPaidItem.date && amountPaidItem.date.getTime() === currentItem.date.getTime()) {
      amountPaidItem.value = amountPaidItem.value + currentItem.amountPaid;
    } else {

      if (amountPaidItem) amountPaids.push(amountPaidItem);

      amountPaidItem = {};
      amountPaidItem.key = 'Revenue';
      amountPaidItem.date = currentItem.date;
      amountPaidItem.value = currentItem.amountPaid;
    }
  });

  series[0] = classPackages;
  series[1] = amountPaids;
  console.log('series', series);

  const x = d3.scaleUtc()
    .domain([data[0].date, data[data.length - 1].date])
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
    .range([height - margin.bottom, margin.top])

  const z = d3.scaleOrdinal(['classPackage', 'amountPaid'], d3.schemeCategory10);

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  const svg = d3.select('#svg-chart')
    .attr('viewBox', [0, 0, width, height]);

  svg.append('g')
    .call(xAxis);

  const serie = svg.append('g')
    .selectAll('g')
    .data(series)
    .join('g');

  serie.append('path')
    .attr('fill', 'none')
    .attr('stroke', d => z(d[0].key))
    .attr('stroke-width', 1.5)
    .attr('d', d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value)));

  serie.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(d => d)
    .join('text')
    .text(d => d.value)
    .attr('dy', '0.35em')
    .attr('x', d => x(d.date))
    .attr('y', d => y(d.value))
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
