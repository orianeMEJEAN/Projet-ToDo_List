import logo from "../../logo.svg";
import "./Header.css"

const Header = () => {
    const refreshPage = () => {
        window.location.reload();
    };


    return (
        <header className="header">
            <img src={logo} alt="logo" onClick={refreshPage} />
            <h1>ToDo-List</h1>
        </header>
    );
};

export default Header;