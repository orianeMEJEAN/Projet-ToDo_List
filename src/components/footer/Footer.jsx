import "./Footer.css"

const Footer = ({ onAddTache }) => {
    return (
        <footer className="footer">
            <h2> Ajout d'une tâche </h2>
            <button className="addBtn" onClick={onAddTache}>+</button>
        </footer>
    );
};

export default Footer;