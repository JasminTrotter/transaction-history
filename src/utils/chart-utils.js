import * as d3 from 'd3';
import moment from 'moment';

export function getDisplayValue(d) {
  return d.key === 'Revenue' ? '$' + d.value * 10 : d.value;
}

export function getDomainMax(series) {
  const domainMax = d3.max(series, s => d3.max(s, d => d.value));

  return domainMax > 20 ? 20 : domainMax;
}

export function getTooltipText(d) {
  const timeStamp = moment(d.date.getTime()).format('MMM Do YYYY');
  let keyLabel = d.key;

  if (d.key === 'Revenue') {
    keyLabel = 'in Daily Revenue';
  } else if (d.key === 'Classes Purchased' && d.value === 1) {
    keyLabel = 'Class Purchased';
  }

  return getDisplayValue(d) + ' ' + keyLabel + '<br>' + ' on ' + timeStamp;
}

export function getDisplayColor(d) {
  let color = 'grey';

  d.forEach(o => {
    if (o.key === 'Revenue') {
      color = '#CC8E83';
    } else if (o.key === 'Classes Purchased') {
      color = '#349EDB';
    }
  })

  return color;
}
