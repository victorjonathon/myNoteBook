import { useState } from 'react';
import NoteContext from './noteContext';
import axios from "axios";

const NoteState = (props)=>{
    const host = 'http://localhost:5000';
    const initialNotes = [];

    const[notes, setNotes] = useState(initialNotes);

    //Function to fetch all notes
    const fetchAllNotes = ()=>{
      axios.get(`${host}/api/notes/fetchallnotes`, {
          headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjE2YzFmZTkxZjI1MTYzNzA4MzllIn0sImlhdCI6MTY0NTk0MzUyNX0.1Ozi6Esoc5mBDiTHPcSk6a5h9EPDgmaEZWkGEhET3vA'
          }
      })
      .then((response)=>{
          setNotes(response.data.notes)
      }).catch(function (error) {
          console.log(error);
      })
    }
    
    //Function to add new note
    const addNewNote = (title, description, tag)=>{
      //console.log(title, description, tag);
      const noteObj = {title, description, tag};
      axios.post(`${host}/api/notes/addnote`, noteObj, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjE2YzFmZTkxZjI1MTYzNzA4MzllIn0sImlhdCI6MTY0NTk0MzUyNX0.1Ozi6Esoc5mBDiTHPcSk6a5h9EPDgmaEZWkGEhET3vA'
        }
      })
      .then((response)=>{
          console.log(response.data);
          fetchAllNotes();
      }).catch(function (error) {
          console.log(error);
      })
    }

    //Function to update a note
    const updateNote = (id, title, description, tag)=>{
        //console.log(title, description, tag);
        const noteObj = {title, description, tag};
        axios.put(`${host}/api/notes/updatenote/${id}`, noteObj, {
          headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjE2YzFmZTkxZjI1MTYzNzA4MzllIn0sImlhdCI6MTY0NTk0MzUyNX0.1Ozi6Esoc5mBDiTHPcSk6a5h9EPDgmaEZWkGEhET3vA'
          }
        })
        .then((response)=>{
            //console.log(response.data);
            fetchAllNotes();
        }).catch(function (error) {
            console.log(error);
        })
      }

    //Function to DELETE a note
    const deleteNote = (id)=>{
        //console.log(id);
        axios.delete(`${host}/api/notes/deletenote/${id}`, {
          headers: {
              'Content-Type': 'application/json',
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjE2YzFmZTkxZjI1MTYzNzA4MzllIn0sImlhdCI6MTY0NTk0MzUyNX0.1Ozi6Esoc5mBDiTHPcSk6a5h9EPDgmaEZWkGEhET3vA'
          }
        })
        .then((response)=>{
            //console.log(response.data);
            fetchAllNotes();
        }).catch(function (error) {
            console.log(error);
        })
      }
    
    return(
        <NoteContext.Provider 
            value={{
                    notes,
                    setNotes,
                    fetchAllNotes,
                    addNewNote,
                    updateNote,
                    deleteNote
                }}>
            
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;