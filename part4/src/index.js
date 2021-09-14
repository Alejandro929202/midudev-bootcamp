import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const notes = [
  {
    //objeto1
    id:1,
    content: 'HTML is easy',
    date: '2019-0530T17:30:31.098Z',
    important: true,
    categories:['sport', 'hobby']
  },
  {
    //objeto2
    id:2,
    content: 'Browser can execute only Javascript',
    date: '2019-0530T17:30:31.091Z',
    important: false
  },
  {
    //objeto3
    id:3,
    content: 'GET and POST are the most important methods of ....',
    date: '2019-0530T17:30:31.298Z',
    important: true
  }
];

const rootElement = document.getElementById('root');
ReactDOM.render(<App notes={notes} />, rootElement); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
