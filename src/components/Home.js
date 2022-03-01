import AddNote from "./AddNote";
import Notes from "./Notes";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();
    if(!localStorage.getItem('token')){
        navigate('/login');
        props.showAlert('Please login to access myNoteBook','danger')
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <Notes/>
        </>
    )
}

export default Home;