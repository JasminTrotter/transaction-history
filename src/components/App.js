import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import * as moment from 'moment';
import '../styles/App.css';

function App() {
  const [wholeDataSet, updateWholeDataSet] = useState(null);
  const [selectedData, updateSelectedData] = useState(null);

  const threeMonthsAgo = moment().subtract(3, 'months');
  const today = moment();

  const [selectedEarliest, updateSelectedEarliest] = useState(threeMonthsAgo);
  const [selectedLatest, updateSelectedLatest] = useState(today);

  useEffect(() => {
    const url = 'https://student-portal-api.herokuapp.com/api/transaction-history';

    fetch(url)
      .then(res => res.json())
      .then((rawData) => {
        console.log('raw data', rawData);
        formatData(rawData);
      })
      .catch(err => console.log(err));

    function formatData(dataSet) {
      dataSet.map(o => {
        o['classPackage'] = parseInt(o['package'].replace(/[classes ]/g, ''));
        o['amountPaid'] = parseInt(o['amountPaid']);
        o['date'] = new Date(o['purchaseDate'].replace(/(th)|(st)|(nd)|(rd)/g, ''));
        delete o.id;
        delete o.userId;
        delete o._id;
        delete o.purchaseDate;
        delete o.package;
        delete o.__v;
      });

      updateWholeDataSet(dataSet);
      filterData(dataSet, selectedEarliest, selectedLatest);
    }
  }, []);


  function filterData(dataSet, begin, end) {
    const filtered = dataSet.filter(d => d.date > begin._d && d.date < end._d);

    updateSelectedData(filtered);
  }

  return (
    <div className='App'>
      <button onClick={() => filterData(wholeDataSet, selectedEarliest.subtract(3, 'months'), selectedLatest.subtract(3, 'months'))}>backtrack 3 months</button>
      <button onClick={() => filterData(wholeDataSet, selectedEarliest.add(3, 'months'), selectedLatest.add(3, 'months'))}>forward 3 months</button>

      <Chart
        dataSet={selectedData}
        earliest={selectedEarliest}
        latest={selectedLatest}
      />
    </div>
  );
}

export default App;
