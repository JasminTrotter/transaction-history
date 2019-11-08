import React, { useEffect } from "react";
import * as d3 from 'd3';
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    const url = 'https://student-portal-api.herokuapp.com/api/transaction-history'

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch(err => console.log(err))
  });

  return (
    <div className="App">

    </div>
  );
}

export default App;
