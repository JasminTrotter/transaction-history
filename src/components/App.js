import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import formatData from '../utils/format-data';
import '../styles/App.css';

function App() {
  const [wholeDataSet, updateWholeDataSet] = useState(null);
  const [selectedData, updateSelectedData] = useState(null);

  const threeMonthsAgo = moment().subtract(3, 'months');
  const today = moment();

  const [beginTime] = useState(threeMonthsAgo);
  const [endTime] = useState(today);

  useEffect(() => {
    const url = 'https://student-portal-api.herokuapp.com/api/transaction-history';

    fetch(url)
      .then(res => res.json())
      .then((rawData) => {
        handleRawData(rawData);
      })
      .catch(err => console.log(err));

    function handleRawData(dataSet) {
      formatData(dataSet);
      updateWholeDataSet(dataSet);
      filterData(dataSet, beginTime, endTime);
    }
  }, []);


  function filterData(dataSet, begin, end) {
    const filtered = dataSet.filter(d => d.date > begin._d && d.date < end._d);

    updateSelectedData(filtered);
  }

  return (
    <div className='App'>
      <button onClick={() => filterData(wholeDataSet, beginTime.subtract(3, 'months'), endTime.subtract(3, 'months'))}>last 3 months</button>
      <button onClick={() => filterData(wholeDataSet, beginTime.add(3, 'months'), endTime.add(3, 'months'))}>next 3 months</button>

      <Chart
        dataSet={selectedData}
        begin={beginTime}
        end={endTime}
      />
    </div>
  );
}

export default App;
