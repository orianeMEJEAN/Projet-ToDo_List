import { useState } from "react";
import "./ModelDossier.css";

/**
 * List of available color names.
 * @type {string[]}
 */
const couleurs = [
    "orange",
    "pink",
    "bluesky",
    "green",
    "red",
    "blue",
    "purple",
    "yellow",
    "grey",
    "teal"];

/**
 * Mapping between color names and their HEX values.
 * @type {Object.<string, string>}
 */
const couleurs_Hex = {
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
 * Modal component used to create or edit a folder.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.dossierInitial - Initial folder data for edit mode
 *
 * @param {string} props.dossierInitial.title - Initial title
 * @param {string} props.dossierInitial.description - Initial description
 * @param {string} props.dossierInitial.color - Initial color
 *
 * @param {Function} props.onConfirm - Callback triggered when the form is submitted
 * @param {Function} props.onCancel - Callback triggered when the modal is cancelled
 *
 * @returns {JSX.Element} The rendered modal component
 */
const ModelDossier = ({ dossierInitial, onConfirm, onCancel }) => {

    /** @type {[string, Function]} Title state **/
    const [title, setTitle] = useState(dossierInitial?.title || "");

    /** @type {[string, Function]} Description state **/
    const [description, setDescription] = useState(dossierInitial?.description || "");

    /** @type {[string, Function]} Selected color state **/
    const [color, setColor] = useState(dossierInitial?.color || "orange");

    /** @type {[string, Function]} Error message state **/
    const [erreur, setErreur] = useState("");

    /**
     * Handles form submission.
     * Validates the title and triggers the onConfirm callback if valid.
     *
     * @function
     * @returns {void}
     */
    const handleSubmit = () => {
        if (title.trim().length < 3)
        {
            setErreur("Le titre doit faire au moins 3 caractères.");
            return;
        }
        onConfirm({ title: title.trim(), description, color });
    };

    return (
        <div className="modelOverlay">
            <div className="modelBox">
                <h2 className="modelTitre">
                    {dossierInitial ? "Modifier le dossier" : "Nouveau dossier"}
                </h2>

                <div className="modelField">
                    <label>Titre *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Minimum 3 caractères"
                    />
                    {erreur && <span className="modelErreur">{erreur}</span>}
                </div>

                <div className="modelField">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optionnelle"
                    />
                </div>

                <div className="modelField">
                    <label>Couleur</label>
                    <div className="modelCouleurs">
                        {couleurs.map((c) => (
                            <button
                                key={c}
                                className={`couleurBtn ${color === c ? "couleurBtnActive" : ""}`}
                                style={{ backgroundColor: couleurs_Hex[c] }}
                                onClick={() => setColor(c)}
                                title={c}
                            />
                        ))}
                    </div>
                </div>

                <div className="modelActions">
                    <button className="modelBtn modelBtnConfirmDossier" onClick={handleSubmit}>
                        {dossierInitial ? "Modifier" : "Créer"}
                    </button>

                    <button className="modelBtn modelBtnCancelDossier" onClick={onCancel}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelDossier;