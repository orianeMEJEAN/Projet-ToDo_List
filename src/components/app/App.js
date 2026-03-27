import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import "./App.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Layout from "../layout/Layout";
import List from "../list/List";
import ListDossiers from "../list/listDossiers/ListDossiers";
import ModelReset from "../mode/ModelReset";
import ModelTache from "../mode/ModelTache";

function App()
{
    const { resetComplet, ajouterTache, revenirBackup } = useTodo();
    const [vue, setVue] = useState("taches");
    const [showModelDemarrage, setShowModelDemarrage] = useState(true);
    const [showModelConfirm, setShowModelConfirm] = useState(false);
    const [showModelTache, setShowModelTache] = useState(false);
    const [showModelBackup, setShowModelBackup] = useState(false);

    const handleDemarrageOui = () => {
        resetComplet();
        localStorage.removeItem("taches");
        localStorage.removeItem("dossiers");
        localStorage.removeItem("relations");
        setShowModelDemarrage(false);
    };

    const handleDemarrageNon = () => {
        setShowModelDemarrage(false);
    };

    const handleBoutonReset = () => {
        setShowModelConfirm(true);
    };

    const handleBoutonBackup = () => {
        setShowModelBackup(true);
    }

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

                    <button className="backupBtn" onClick={handleBoutonBackup}>
                        Revenir au backup
                    </button>

                    <button className="resetBtn" onClick={handleBoutonReset}>
                        Repartir de zéro
                    </button>
                </div>

                {vue === "taches" ? <List /> : <ListDossiers />}
            </main>

            <Footer onAddTache={() => setShowModelTache(true)} />

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

            {showModelTache && (
                <ModelTache
                    onConfirm={(data, dossierIds) => {
                        ajouterTache(data, dossierIds);
                        setShowModelTache(false);
                    }}
                    onCancel={() => setShowModelTache(false)}
                />
            )}

            {showModelBackup && (
                <ModelReset
                    message={"Revenir aux données du backup JSON ? \n ⚠️ Attention, vos ajouts et modifications ne seront pas conservés"}
                    onConfirm={() => { revenirBackup(); setShowModelBackup(false); }}
                    onCancel={() => setShowModelBackup(false)}
                />
            )}
        </Layout>
    );
}

export default App;