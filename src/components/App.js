import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import { formatData } from '../utils';
import Buttons from './Buttons';
import Header from './Header';
import '../styles/App.css';

function App() {
  const [selectedData, updateSelectedData] = useState(null);
  const [rawData, setRawData] = useState(null);
  const oneMonthAgo = moment().subtract(1, 'months');
  const today = moment();
  const [beginTime, updateBeginTime] = useState(oneMonthAgo);
  const [endTime, updateEndTime] = useState(today);
  const [filter, setFilter] = useState(false);
  const [showLast, setShowLast] = useState(true);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    const url = 'https://student-portal-api.herokuapp.com/api/transaction-history';

    fetch(url)
      .then(res => res.json())
      .then((rawData) => {
        formatData(rawData);
        setRawData(rawData);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(
    () => {
      if (rawData) {
        updateSelectedData(filterData(rawData, beginTime, endTime))
        setFilter(false);

        const firstRawData = rawData[0].date.getTime();
        const lastRawData = rawData[rawData.length - 1].date.getTime();

        if (beginTime._d < firstRawData) {
          setShowLast(false);
        }

        if (beginTime._d > firstRawData && endTime._d < lastRawData) {
          setShowNext(true);
          setShowLast(true);
        }

        if (endTime._d > lastRawData) {
          setShowNext(false);
        }
      }
    },
    [
      rawData,
      beginTime,
      endTime,
      filter
    ]
  );

  function filterData(dataSet, begin, end) {
    return dataSet.filter(d => d.date > begin._d && d.date < end._d);
  }

  function handleLastThree() {
    updateBeginTime(beginTime.subtract(1, 'months'));
    updateEndTime(endTime.subtract(1, 'months'));
    setFilter(true);
  }

  function handleNextThree() {
    updateBeginTime(beginTime.add(1, 'months'));
    updateEndTime(endTime.add(1, 'months'));
    setFilter(true);
  }

  return (
    <div className='App'>
      <Header />
      <Chart
        dataSet={selectedData}
        rawData={rawData}
        begin={beginTime}
        end={endTime}
      />
      <Buttons
        next={handleNextThree}
        last={handleLastThree}
        begin={beginTime}
        end={endTime}
        rawData={rawData}
        showLast={showLast}
        showNext={showNext}
      />
      <div style={{ borderTop: '3px solid #349EDB' }}></div>
    </div>
  );
}

export default App;
