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
    }

    return (
        <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="email" className="form-control" id="title" name="title" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
    )
}

export default AddNote;