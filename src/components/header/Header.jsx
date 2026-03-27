import logo from "../../logo.svg";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/Etats";
import "./Header.css";

const Header = () => {
    const { taches } = useTodo();
    const nbTotal = taches.length;
    const nbNonTerminees = taches.filter((t) => !ETAT_TERMINE.includes(t.etat)).length;
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <header className="header">
            <img src={logo} alt="logo" onClick={refreshPage} />
            <h1 className="headerTitre">ToDo-List</h1>
            <div className="headerStats">
                <div className="headerStat">
                    <span className="headerStatNombre">{nbTotal}</span>
                    <span className="headerStatLabel">tâches au total</span>
                </div>
                <div className="headerSeparateur" />
                <div className="headerStat">
                    <span className="headerStatNombre headerStatNombreEncours">{nbNonTerminees}</span>
                    <span className="headerStatLabel">non terminées</span>
                </div>
            </div>
        </header>
    );
};

export default Header;