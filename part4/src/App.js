import './App.css';
import { Note } from './Note.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllNotes } from "./services/notes/getAllNotes";
import { createNote } from './services/createNode';


/*
{notes.map((note) => {
      return <p><strong>{note.id}</strong></p>;
    })}

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) =>{
      console.log(json);
      setNotes(json)
      setLoading(false);
    });
  }, [])
*/

export default function App(){
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  //const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() =>{
    console.log("useEffect");
    setLoading(true);
    getAllNotes()
    .then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, [])

  
  

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('crear nota');
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    setError("");

    createNote(noteToAddToState)
    .then(newNote => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    }).catch((e) =>{
      console.error(e);
      setError("La API ha petado");
    })

    //setNotes(notes.concat(noteToAddToState));
    //setNotes([...notes, noteToAddToState]) MEJOR FORMA CON SPREND
    setNewNote("");

  }

 /* const handleShowAll = () => {
    setShowAll(() => !showAll);
  }
 <button onClick={handleShowAll}>{showAll ? "Show only important" : "show all"}</button> 
.filter(note => {
  if (showAll === true) return true;
  return note.important === true;
})*/


  if(typeof notes === "undefined" || notes.lenght === 0){
    return "No tenemos notas que mostrar";
  }
  return (
  <div>
    <h1>Notes</h1>
    { loading ? "Cargando..." : ""}
    
      <ol>
          {notes
        
          .map((note) => <Note key={note.id} {...note} />)}
      </ol>
      <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChange} />
          <button>Crear nota</button>
          {Error ? error : ""}
      </form>
  </div>
  );
};
