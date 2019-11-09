import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import '../styles/App.css';

function App() {
  const [dataSet, updateDataSet] = useState(null);

  useEffect(() => {
    const url = 'https://student-portal-api.herokuapp.com/api/transaction-history';

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log('raw data', data);
        updateDataSet(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='App'>
      <Chart dataSet={dataSet} />
    </div>
  );
}

export default App;
