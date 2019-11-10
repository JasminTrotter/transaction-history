import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import formatData from '../utils/format-data';
import '../styles/App.css';

function App() {
  const [selectedData, updateSelectedData] = useState(null);

  const threeMonthsAgo = moment().subtract(3, 'months');
  const today = moment();

  const [beginTime, updateBeginTime] = useState(threeMonthsAgo);
  const [endTime, updateEndTime] = useState(today);

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
      filterData(dataSet, beginTime, endTime);
    }
  }, [beginTime, endTime, selectedData]);


  function filterData(dataSet, begin, end) {
    const filtered = dataSet.filter(d => d.date > begin._d && d.date < end._d);

    updateSelectedData(filtered);
  }

  function handleLastThree() {
    updateBeginTime(beginTime.subtract(3, 'months'));
    updateEndTime(endTime.subtract(3, 'months'));
  }

  function handleNextThree() {
    updateBeginTime(beginTime.add(3, 'months'));
    updateEndTime(endTime.add(3, 'months'));
  }

  return (
    <div className='App'>
      <button onClick={() => handleLastThree()}>last 3 months</button>
      <button onClick={() => handleNextThree()}>next 3 months</button>

      <Chart
        dataSet={selectedData}
        begin={beginTime}
        end={endTime}
      />
    </div>
  );
}

export default App;
