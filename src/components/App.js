import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import formatData from '../utils/format-data';
import Buttons from './Buttons';
import '../styles/App.css';

function App() {
  const [selectedData, updateSelectedData] = useState(null);
  const [rawData, setRawData] = useState(null);
  const threeMonthsAgo = moment().subtract(3, 'months');
  const today = moment();
  const [beginTime, updateBeginTime] = useState(threeMonthsAgo);
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
    updateBeginTime(beginTime.subtract(3, 'months'));
    updateEndTime(endTime.subtract(3, 'months'));
    setFilter(true);
  }

  function handleNextThree() {
    updateBeginTime(beginTime.add(3, 'months'));
    updateEndTime(endTime.add(3, 'months'));
    setFilter(true);
  }

  return (
    <div className='App'>

      <Buttons
        next={handleNextThree}
        last={handleLastThree}
        begin={beginTime}
        end={endTime}
        rawData={rawData}
        showLast={showLast}
        showNext={showNext}
      />

      <Chart
        dataSet={selectedData}
        begin={beginTime}
        end={endTime}
      />
    </div>
  );
}

export default App;
