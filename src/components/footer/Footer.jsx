import "./Footer.css"

/**
 * Footer component providing quick access to task creation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onAddTache - Callback triggered when the add button is clicked
 *
 * @returns {JSX.Element} The rendered footer
 */
const Footer = ({ onAddTache }) => {
    return (
        <footer className="footer">
            <h2> Ajout d'une tâche </h2>
            <button className="addBtn" onClick={onAddTache}>+</button>
        </footer>
    );
};

export default Footer;