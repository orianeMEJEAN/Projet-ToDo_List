import { useTodo } from "../../context/TodoContext";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Layout from "../Layout/Layout";
import List from "../List/List";

function App() {
    const { taches } = useTodo();

    return (
        <Layout>
            <Header />

            <main className="main">
                <List />
            </main>

            <Footer />
        </Layout>
    );
}

export default App;