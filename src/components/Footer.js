import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2020 Copyright:
                <Link className="text-dark" to="/about">MyNoteBook</Link>
            </div>
        </footer>
    )
}

export default Footer;