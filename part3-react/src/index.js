import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';


const rootElement = document.getElementById('root');

const App = (props) =>{
  const [contadorValue, updateContador] = useState(13);
  
  /*
  const contador = useState(5);
  const contadorValue = contador[0];
  const updateContador = contador[1];
  */

  setInterval(() => {
    updateContador(contadorValue + 1)
  }, 2000);

  console.log("render");

  return (
    <div>
      <p>el valor del contador es: </p>
      <h1>{contadorValue}</h1>
      <h2>Magia de React</h2>
    </div>
  );
};


ReactDOM.render(<App />, rootElement);



