import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import { formatData } from '../utils';
import Buttons from './Buttons';
import Header from './Header';
import Legend from './Legend';
import '../styles/App.css';

function App() {
  const [selectedData, updateSelectedData] = useState(null);
  const [wholeDataSet, setWholeDataSet] = useState(null);

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
        setWholeDataSet(rawData);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(
    () => {
      if (wholeDataSet) {
        updateSelectedData(filterData(wholeDataSet, beginTime, endTime))
        setFilter(false);

        const firstwholeDataSet = wholeDataSet[0].date.getTime();
        const lastwholeDataSet = wholeDataSet[wholeDataSet.length - 1].date.getTime();

        if (beginTime._d < firstwholeDataSet) {
          setShowLast(false);
        }

        if (beginTime._d > firstwholeDataSet && endTime._d < lastwholeDataSet) {
          setShowNext(true);
          setShowLast(true);
        }

        if (endTime._d > lastwholeDataSet) {
          setShowNext(false);
        }
      }
    },
    [
      wholeDataSet,
      beginTime,
      endTime,
      filter
    ]
  );

  function filterData(dataSet, begin, end) {
    return dataSet.filter(d => d.date > begin._d && d.date < end._d);
  }

  function handleLastMonth() {
    updateBeginTime(beginTime.subtract(1, 'months'));
    updateEndTime(endTime.subtract(1, 'months'));
    setFilter(true);
  }

  function handleNextMonth() {
    updateBeginTime(beginTime.add(1, 'months'));
    updateEndTime(endTime.add(1, 'months'));
    setFilter(true);
  }

  return (
    <div className='App'>
      <Header />
      <Chart
        dataSet={selectedData}
        wholeDataSet={wholeDataSet}
        begin={beginTime}
        end={endTime}
      />
      <Buttons
        begin={beginTime}
        end={endTime}
        last={handleLastMonth}
        next={handleNextMonth}
        showLast={showLast}
        showNext={showNext}
        wholeDataSet={wholeDataSet}
      />
      <Legend />
    </div>
  );
}

export default App;
