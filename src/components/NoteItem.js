import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const { note } = props;
    const { deleteNote } = useContext(noteContext);

    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>deleteNote(note._id)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;