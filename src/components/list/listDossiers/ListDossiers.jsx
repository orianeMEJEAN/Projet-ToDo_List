import { useState } from "react";
import { useTodo } from "../../../context/TodoContext";
import Dossier from "../../dossier/Dossier";
import ModelDossier from "../../mode/ModelDossier";
import "./ListDossiers.css";

const ListDossiers = () => {
    const { dossiers, ajouterDossier } = useTodo();
    const [showModel, setShowModel] = useState(false);

    return (
        <div className="listDossiersContainer">
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