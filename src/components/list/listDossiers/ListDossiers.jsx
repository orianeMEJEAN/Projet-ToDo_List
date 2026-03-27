import { useState } from "react";
import { useTodo } from "../../../context/TodoContext";
import Dossier from "../../dossier/Dossier";
import ModelDossier from "../../mode/ModelDossier";
import Filtre from "../../filtre/Filtre";
import "./ListDossiers.css";

const ListDossiers = () => {
    const { dossiers, ajouterDossier } = useTodo();
    const [showModel, setShowModel] = useState(false);

    const [tri, setTri] = useState("date_echeance");
    const [filtreEtats, setFiltreEtats] = useState([]);
    const [filtreDossiers, setFiltreDossiers] = useState([]);
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