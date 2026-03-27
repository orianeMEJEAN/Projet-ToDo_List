import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import ModelDossier from "../mode/ModelDossier";
import ModelReset from "../mode/ModelReset";
import "./Dossier.css";

/**
 * Mapping between folder color names and HEX values.
 * @type {Object.<string, string>}
 */
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

/**
 * Component representing a single folder.
 * Allows editing and deletion with confirmation.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.dossier - Folder object
 *
 * @param {number|string} props.dossier.id - Folder ID
 *
 * @param {string} props.dossier.title - Folder title
 * @param {string} props.dossier.description - Folder description
 * @param {string} props.dossier.color - Folder color key
 *
 * @returns {JSX.Element} The rendered folder item
 */
const Dossier = ({ dossier }) => {

    /** Context providing folder actions and relations**/
    const { modifierDossier, supprimerDossier, relations } = useTodo();

    /** @type {[boolean, Function]} Toggle edit modal **/
    const [showEdit, setShowEdit] = useState(false);

    /** @type {[boolean, Function]} Toggle delete confirmation modal **/
    const [showConfirm, setShowConfirm] = useState(false);

    /**
     * Number of tasks associated with this folder.
     * @type {number}
     */
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