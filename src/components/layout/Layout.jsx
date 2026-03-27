/**
 * Layout component used as a wrapper for the application.
 * It provides a global container for consistent styling and structure.
 *
 * @component
 * @param {Object} props - Component props
 *
 * @param {React.ReactNode} props.children - Elements to be rendered inside the layout
 *
 * @returns {JSX.Element} The wrapped application content
 */
const Layout = ({ children }) => {
    return (
        <div className="appContainer">
            {children}
        </div>
    );
};

export default Layout;