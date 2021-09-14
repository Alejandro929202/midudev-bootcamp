import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';


const rootElement = document.getElementById('root');

const Counter = ({ number }) =>{
  return <h1>{number}</h1>
}

const App = (props) =>{
  const [contador, setContador] = useState(0); //valor inicial
  
  /*
  const contador = useState(5);
  const contadorValue = contador[0];
  const updateContador = contador[1];
  

  setInterval(() => {
    updateContador(contadorValue + 1)
  }, 2000);
*/
  console.log("render");

  const handleClick = () => {
    setContador(contador + 1);
  }

  const handleClickReset = () =>{
    setContador(0);
  }

  const isEven = contador % 2 === 0;
  const mensajePar = isEven ? 'Es par' : 'Es impar';


  return (
    <div>
      <p>el valor del contador es: </p>
      <Counter number={contador} />
      <p>{mensajePar}</p>
      <button onClick={handleClick}>
        Incrementar
      </button>
      <button onClick={handleClickReset}>
        Reset
      </button>
    </div>
  );
};


ReactDOM.render(<App />, rootElement);



