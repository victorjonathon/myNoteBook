import { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = ()=>{
    const { notes, fetchAllNotes } = useContext(noteContext);
    
    useEffect(()=>{
        fetchAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
        <>
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes;