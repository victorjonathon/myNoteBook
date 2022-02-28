import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext"; 

const AddNote = ()=>{
    const [note, setNote] = useState({title: "", description: "", tag: "Default"});
    const { addNewNote } =  useContext(noteContext);

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        addNewNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
    }

    return (
        <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={note.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
    )
}

export default AddNote;