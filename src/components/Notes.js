import { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
    const { notes, fetchAllNotes, updateNote } = useContext(noteContext);
    const [note, setNote] = useState({id: '', etitle: "", edescription: "", etag: "Default"});

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const modalTriggerRef = useRef(null);
    const closeModelRef = useRef(null);

    const showNoteInModal = (crNote) => {
        modalTriggerRef.current.click();
        setNote({id: crNote._id, etitle: crNote.title, edescription: crNote.description, etag: crNote.tag})
    }

    const handleChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        updateNote(note.id, note.etitle, note.edescription, note.etag);
        closeModelRef.current.click();
    }

    return (
        <>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">{notes.length === 0 && 'No notes available.'}</div>
                
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showNoteInModal={showNoteInModal} />;
                })
                }
            </div>

            <button type="button" ref={modalTriggerRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#myModal">
                Launch demo modal
            </button>
            <div className="modal" id="myModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModelRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes;