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
              'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjE2OTdmZTkxZjI1MTYzNzA4MzlhIn0sImlhdCI6MTY0NTg2OTQyOX0.59Izsao40Y4_pts3A8uxtXNWyHv2fbCJfnGcBnd5tes'
          }
      })
      .then((response)=>{
          setNotes(response.data.notes)

      }).catch(function (error) {
          console.log(error);
      })
    } 
    
    return(
        <NoteContext.Provider 
            value={{
                    notes,
                    setNotes,
                    fetchAllNotes
                }}>
            
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;