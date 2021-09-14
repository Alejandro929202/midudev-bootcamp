import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import { useState } from 'react';

//Renderizado condicional -> componente de aviso 
const WarningNotUsed = () => {
    return <h1>Todavía no se ha usado el contador</h1>
}

//Renderizado condicional -> componente de listado de clicks
const ListOfClicks = ({clicks}) => {
    return <p>{clicks.join(", ")}</p>
}

const App = () => { 
    //const [left, setLeft] = useState(10)
    //const [right, setRight] = useState(23)

    //Estado complejo con objetos
    const [counters, setCounters] = useState({
        left: 0,
        right: 0,
        mensaje: 'Mensaje en el estado'
    })

    //Estado con array
    const [clicks, setClicks] = useState([])

    const handleClickLeft = () =>{
        const newCounterState = {
            ...counters, //carga todos las variables del estado y sobreescribe las nuevas
            left: counters.left + 1,
        }
        setCounters(newCounterState); // Podemos crear una const con los nuevos valores y pasarselo al estado
        setClicks((prevClicks) => [...prevClicks, "L"]);
    }

    const handleClickRight = () =>{
        setCounters({
            ...counters,
            right: counters.right + 1,
        })
        setClicks((prevClicks) => [...prevClicks, 'R']);
    }

    return(
        <div>
            {counters.left}
            <button onClick={handleClickLeft}>left</button>
            <button onClick={handleClickRight}>right</button>
            {counters.right}
            <p>Clicks totales: {clicks.length}</p>
            <p>{counters.mensaje}</p>
            {clicks.length === 0 ? (<WarningNotUsed />) : (<ListOfClicks clicks={clicks} />)}
        </div>
    )
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);