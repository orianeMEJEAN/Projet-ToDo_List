import { useState } from "react";
import { useTodo } from "../../../context/TodoContext";
import Dossier from "../../dossier/Dossier";
import ModelDossier from "../../mode/ModelDossier";
import Filtre from "../../filtre/Filtre";
import "./ListDossiers.css";

/**
 * Component that displays the list of folders
 * Includes filtering options and a modal to create new folders
 *
 * @component
 * @returns {JSX.Element} The rendered folder list with controls
 */
const ListDossiers = () => {

    /** Context providing folders and creation function **/
    const { dossiers, ajouterDossier } = useTodo();

    /** @type {[boolean, Function]} Controls visibility of the creation modal **/
    const [showModel, setShowModel] = useState(false);

    /** @type {[string, Function]} Sorting criteria **/
    const [tri, setTri] = useState("date_echeance");

    /** @type {[string[], Function]} Selected status filters **/
    const [filtreEtats, setFiltreEtats] = useState([]);

    /** @type {[number[], Function]} Selected folder filters **/
    const [filtreDossiers, setFiltreDossiers] = useState([]);

    /** @type {[boolean, Function]} Toggle to show only ongoing items **/
    const [enCoursActif, setEnCoursActif] = useState(true);

    return (
        <div className="listDossiersContainer">
            <Filtre
                tri={tri} setTri={setTri}
                filtreEtats={filtreEtats} setFiltreEtats={setFiltreEtats}
                filtreDossiers={filtreDossiers} setFiltreDossiers={setFiltreDossiers}
                enCoursActif={enCoursActif} setEnCoursActif={setEnCoursActif}
            />

            <div className="listDossiersHeader">
                <p className="listDossiersInfo">
                    {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""}
                </p>
                <button className="addDossierBtn" onClick={() => setShowModel(true)}>
                    Nouveau dossier
                </button>
            </div>

            <ul className="listDossiers">
                {dossiers.map((dossier) => (
                    <Dossier key={dossier.id} dossier={dossier} />
                ))}
            </ul>

            {showModel && (
                <ModelDossier
                    onConfirm={(data) => { ajouterDossier(data); setShowModel(false); }}
                    onCancel={() => setShowModel(false)}
                />
            )}
        </div>
    );
};

export default ListDossiers;