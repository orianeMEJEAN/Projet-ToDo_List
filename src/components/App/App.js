import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Layout from "../Layout/Layout";
import List from "../List/List";
import ModelReset from "../Mode/ModelReset";

function App() {
    const { resetComplet } = useTodo();
    const [showModelDemarrage, setShowModelDemarrage] = useState(true);
    const [showModelConfirm, setShowModelConfirm] = useState(false);

    const handleDemarrageOui = () => {
        resetComplet();
        setShowModelDemarrage(false);
    };

    const handleDemarrageNon = () => {
        setShowModelDemarrage(false);
    };

    const handleBoutonReset = () => {
        setShowModelConfirm(true);
    };

    const handleConfirmOui = () => {
        resetComplet();
        setShowModelConfirm(false);
    };

    const handleConfirmNon = () => {
        setShowModelConfirm(false);
    };

    return (
        <Layout>
            <Header />

            <main className="main">
                <div className="resetBar">
                    <button className="resetBtn" onClick={handleBoutonReset}>
                        Repartir de zéro
                    </button>
                </div>

                <List />
            </main>

            <Footer />

            {showModelDemarrage && (
                <ModelReset
                    message="Voulez-vous repartir de zéro ?"
                    onConfirm={handleDemarrageOui}
                    onCancel={handleDemarrageNon}
                />
            )}

            {showModelConfirm && (
                <ModelReset
                    message="Êtes-vous sûr(e) de vouloir tout effacer ?"
                    onConfirm={handleConfirmOui}
                    onCancel={handleConfirmNon}
                />
            )}
        </Layout>
    );
}

export default App;