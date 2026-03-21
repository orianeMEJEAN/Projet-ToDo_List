import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import ModelDossier from "../mode/ModelDossier";
import ModelReset from "../mode/ModelReset";
import "./Dossier.css";

const dossier_colors = {
    orange: "#5e3700",
    pink: "#75003f",
    bluesky: "#004e73",
    green: "#006c03",
    red: "#690600",
    blue: "#003467",
    purple: "#49005e",
    yellow: "#564500",
    grey: "#414141",
    teal: "#005249",
};

const Dossier = ({ dossier }) => {
    const { modifierDossier, supprimerDossier, relations } = useTodo();
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const nbTaches = relations.filter((r) => r.dossier === dossier.id).length;

    return (
        <li className="dossier">
            <div
                className="dossierCouleur"
                style={{ backgroundColor: dossier_colors[dossier.color] }}
            />

            <div className="dossierContent">
                <span className="dossierTitle">{dossier.title}</span>
                {dossier.description && (
                    <span className="dossierDescription">{dossier.description}</span>
                )}
                <span className="dossierNbTaches">
                    {nbTaches} tâche{nbTaches > 1 ? "s" : ""}
                </span>
            </div>

            <div className="dossierActions">
                <button className="dossierBtn dossierBtnEdit" onClick={() => setShowEdit(true)}>
                    Modifier
                </button>
                <button className="dossierBtn dossierBtnDelete" onClick={() => setShowConfirm(true)}>
                    Supprimer
                </button>
            </div>

            {showEdit && (
                <ModelDossier
                    dossierInitial={dossier}
                    onConfirm={(data) => { modifierDossier(dossier.id, data); setShowEdit(false); }}
                    onCancel={() => setShowEdit(false)}
                />
            )}

            {showConfirm && (
                <ModelReset
                    message={`Supprimer "${dossier.title}" ?`}
                    onConfirm={() => supprimerDossier(dossier.id)}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </li>
    );
};

export default Dossier;