import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import "./App.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Layout from "../layout/Layout";
import List from "../list/List";
import ListDossiers from "../list/listDossiers/ListDossiers";
import ModelReset from "../mode/ModelReset";

function App() {
    const { resetComplet } = useTodo();
    const [vue, setVue] = useState("taches");
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
                    <div className="resetBarGauche">
                        <button
                            className={`basculeBtn ${vue === "taches" ? "basculeBtnActive" : ""}`}
                            onClick={() => setVue("taches")}
                        >
                            Tâches
                        </button>

                        <button
                            className={`basculeBtn ${vue === "dossiers" ? "basculeBtnActive" : ""}`}
                            onClick={() => setVue("dossiers")}
                        >
                            Dossiers
                        </button>
                    </div>

                    <button className="resetBtn" onClick={handleBoutonReset}>
                        Repartir de zéro
                    </button>
                </div>

                {vue === "taches" ? <List /> : <ListDossiers />}
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