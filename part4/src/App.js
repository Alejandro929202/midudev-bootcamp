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
  const [showAll, setShowAll] = useState(true);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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

  const handleShowAll = () => {
    setShowAll(() => !showAll);
  }

  if(typeof notes === "undefined" || notes.lenght === 0){
    return "No tenemos notas que mostrar";
  }
  return (
  <div>
    <h1>Notes</h1>
    <button onClick={handleShowAll}>{showAll ? "Show only important" : "show all"}</button>
      <ol>
          {notes
          .filter(note => {
            if (showAll === true) return true;
            return note.important === true;
          })
          .map((note) => <Note key={note.id} {...note} />)}
      </ol>
      <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChange} />
          <button>Crear nota</button>
      </form>
  </div>
  );
};
