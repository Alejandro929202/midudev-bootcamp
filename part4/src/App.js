import './App.css';
import { Note } from './Note.js';
import { useState } from 'react';


/*
{notes.map((note) => {
      return <p><strong>{note.id}</strong></p>;
    })}
*/



export default function App(props){
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const handleClick = (event) => {
    console.log('crear nota');
    const noteToAddToState = {
      id:notes.lenght + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    };

    setNotes(notes.concat(noteToAddToState));
    //setNotes([...notes, noteToAddToState]) MEJOR FORMA CON SPREND
    setNewNote("");

  }

  if(typeof notes === "undefined" || notes.lenght === 0){
    return "No tenemos notas que mostrar";
  }
  return (
  <div>
    <h1>Notes</h1>
      <ol>
          {notes.map((note) => <Note key={note.id} {...note} />)}
      </ol>
      <div>
          <input type='text' onChange={handleChange} />
          <button onClick={handleClick}>Crear nota</button>
      </div>
  </div>
  );
};
