import { useTodo } from "../../context/TodoContext";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Layout from "../Layout/Layout";

function App() {
    const { taches, dossiers, relations } = useTodo();

    return (
        <Layout>
            <Header />

            <main className="main">
                <p>Nombre de tâches :D : {taches.length}</p>
                <p>Nombre de dossiers :3 : {dossiers.length}</p>
                <p>Nombre de relations :) : {relations.length}</p>
            </main>

            <Footer />
        </Layout>
    );
}

export default App;