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

/**
 * Main application component.
 * Handles global UI state (views, modals) and connects all major features:
 * tasks, folders, reset/backup system, and creation modals.
 *
 * @component
 * @returns {JSX.Element} The entire application layout
 */
function App()
{
    /** Context providing global todo actions */
    const { resetComplet, ajouterTache, revenirBackup } = useTodo();

    /** Current view: "taches" or "dossiers" **/
    const [vue, setVue] = useState("taches");

    /** Modal shown on first app load **/
    const [showModelDemarrage, setShowModelDemarrage] = useState(true);

    /** Modal for full reset confirmation **/
    const [showModelConfirm, setShowModelConfirm] = useState(false);

    /** Modal for creating a new task **/
    const [showModelTache, setShowModelTache] = useState(false);

    /** Modal for restoring backup data **/
    const [showModelBackup, setShowModelBackup] = useState(false);

    /**
     * Initial reset confirmation
     */
    const handleDemarrageOui = () => {
        resetComplet();
        localStorage.removeItem("taches");
        localStorage.removeItem("dossiers");
        localStorage.removeItem("relations");
        setShowModelDemarrage(false);
    };

    /**
     * Cancel initial reset confirmation
     */
    const handleDemarrageNon = () => {
        setShowModelDemarrage(false);
    };

    /**
     * Open full reset confirmation modal
     */
    const handleBoutonReset = () => {
        setShowModelConfirm(true);
    };

    /**
     * Open backup restore confirmation modal
     */
    const handleBoutonBackup = () => {
        setShowModelBackup(true);
    };

    /**
     * Confirm full reset of application data
     */
    const handleConfirmOui = () => {
        resetComplet();
        setShowModelConfirm(false);
    };

    /**
     * Cancel full reset
     */
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