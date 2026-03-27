import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/Etats";
import "./Tache.css";

/**
 * Mapping between task status and display colors.
 * @type {Object.<string, string>}
 */
const etat_colors = {
    "Nouveau": "#60d8f9",
    "En cours": "#f9a825",
    "En attente": "#ab47bc",
    "Réussi": "#66bb6a",
    "Abandonné": "#ef5350",
};

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
 * Component representing a single task.
 * Supports display, editing, and folder assignment.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.tache - Task object
 *
 * @param {number|string} props.tache.id - Task ID
 *
 * @param {string} props.tache.title - Task title
 * @param {string} props.tache.description - Task description
 * @param {string} props.tache.date_echeance - Due date
 * @param {string} props.tache.etat - Task status
 *
 * @param {Array<{name: string}>} props.tache.equipiers - Team members
 *
 * @param {Object[]} props.dossiers - Associated folders
 *
 * @returns {JSX.Element} The rendered task item
 */
const Tache = ({ tache, dossiers }) => {

    /** Context providing task update and folder relations **/
    const { modifierTache, dossiers: tousLesDossiers, relations, setRelations } = useTodo();

    /** @type {[boolean, Function]} Edit mode toggle **/
    const [modeEdition, setModeEdition] = useState(false);

    /** @type {[boolean, Function]} Toggle folder assignment UI **/
    const [showAjoutDossier, setShowAjoutDossier] = useState(false);

    /** @type {[string, Function]} Edited title **/
    const [editTitle, setEditTitle] = useState(tache.title);

    /** @type {[string, Function]} Edited description **/
    const [editDescription, setEditDescription] = useState(tache.description);

    /** @type {[string, Function]} Edited due date **/
    const [editDateEcheance, setEditDateEcheance] = useState(tache.date_echeance);

    /** @type {[string, Function]} Edit error message **/
    const [erreurEdit, setErreurEdit] = useState("");

    /** @type {[boolean, Function]} Toggle full display mode **/
    const [modeComplet, setModeComplet] = useState(false);
    const { title, description, date_echeance, etat, equipiers } = tache;

    /** Display limited or full list of folders **/
    const dossiersAffiches = modeComplet ? dossiers : dossiers.slice(0, 2);

    /**
     * Formats a date string into a readable format
     *
     * @function
     * @param {string} dateStr - Date string
     * @returns {string} Formatted date (DD/MM/YYYY)
     */
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    /**
     * Saves edited task data after validation.
     *
     * @function
     * @returns {void}
     */
    const handleSauvegarder = () => {
        if (editTitle.trim().length < 5)
        {
            setErreurEdit("Le titre doit faire au moins 5 caractères.");
            return;
        }
        if (!editDateEcheance)
        {
            setErreurEdit("La date d'échéance est obligatoire.");
            return;
        }
        modifierTache(tache.id, {
            title: editTitle.trim(),
            description: editDescription,
            date_echeance: editDateEcheance,
        });
        setModeEdition(false);
        setErreurEdit("");
    };

    /**
     * Cancels editing and restores original values.
     *
     * @function
     * @returns {void}
     */
    const handleAnnulerEdition = () => {
        setEditTitle(tache.title);
        setEditDescription(tache.description);
        setEditDateEcheance(tache.date_echeance);
        setModeEdition(false);
        setErreurEdit("");
    };

    /**
     * List of folders not yet associated with the task.
     * @type {Object[]}
     */
    const dossiersDisponibles = tousLesDossiers.filter(
        (d) => !dossiers.find((dos) => dos.id === d.id)
    );

    /**
     * Adds a folder to the current task.
     *
     * @function
     * @param {number|string} dossierId - Folder ID
     * @returns {void}
     */
    const ajouterDossierATache = (dossierId) => {
        setRelations((prev) => [...prev, { tache: tache.id, dossier: dossierId }]);
        setShowAjoutDossier(false);
    };

    return (
        <li className={`tache ${modeComplet ? "tacheComplet" : ""}`}>

            <div className="tacheHeader">
                <div className="tacheHeaderLeft">
                    <span
                        className="tacheEtatBadge"
                        style={{ backgroundColor: etat_colors[etat] || "#ccc" }}
                    >
                        {etat}
                    </span>
                    {modeEdition ? (
                        <input
                            className="tacheEditInput"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    ) : (
                        <span className="tacheTitle">{title}</span>
                    )}
                </div>

                <div className="tacheHeaderRight">
                    {modeEdition ? (
                        <input
                            className="tacheEditDate"
                            type="date"
                            value={editDateEcheance}
                            onChange={(e) => setEditDateEcheance(e.target.value)}
                        />
                    ) : (
                        <span className="tacheDate">{formatDate(date_echeance)}</span>
                    )}
                    <button
                        className={`tacheToggle ${modeComplet ? "tacheToggleOpen" : ""}`}
                        onClick={() => { setModeComplet(!modeComplet); setModeEdition(false); }}
                    >
                        ▶
                    </button>
                </div>
            </div>

            {dossiers.length > 0 && (
                <div className="tacheDossiers">
                    <span className="tacheDossiersLabel">Dossiers :</span>
                    {dossiersAffiches.map((dossier) => (
                        <span
                            key={dossier.id}
                            className="tacheDossierTag"
                            style={{ backgroundColor: dossier_colors[dossier.color] || "#888" }}
                        >
                            {dossier.title}
                        </span>
                    ))}
                    {!modeComplet && dossiers.length > 2 && (
                        <span className="tacheDossierMore">+{dossiers.length - 2}</span>
                    )}
                </div>
            )}

            {modeComplet && (
                <div className="tacheDetails">
                    {modeEdition ? (
                        <textarea
                            className="tacheEditTextarea"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description (optionnelle)"
                            rows={3}
                        />
                    ) : (
                        <p className={`tacheDescription ${!tache.description ? "tacheDescriptionEmpty" : ""}`}>
                            {tache.description || "Aucune description"}
                        </p>
                    )}

                    {erreurEdit && <span className="tacheErreur">{erreurEdit}</span>}

                    {equipiers && equipiers.length > 0 && (
                        <div className="tacheEquipiers">
                            <span className="tacheEquipiersLabel">Équipiers :</span>
                            {equipiers.map((eq, index) => (
                                <span key={index} className="tacheEquipierTag">
                                    {eq.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="tacheActions">
                        {modeEdition ? (
                            <>
                                <button className="tacheAction tacheAction--save" onClick={handleSauvegarder}>
                                    Sauvegarder
                                </button>
                                <button className="tacheAction tacheAction--cancel" onClick={handleAnnulerEdition}>
                                    Annuler
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="tacheAction tacheAction--edit" onClick={() => setModeEdition(true)}>
                                    Éditer
                                </button>
                                {dossiersDisponibles.length > 0 && (
                                    <button className="tacheAction tacheAction--dossier" onClick={() => setShowAjoutDossier(!showAjoutDossier)}>
                                        Dossier
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {showAjoutDossier && (
                        <div className="tacheAjoutDossiers">
                            {dossiersDisponibles.map((d) => (
                                <button
                                    key={d.id}
                                    className="tacheAjoutDossierBtn"
                                    style={{ backgroundColor: dossier_colors[d.color] || "#888" }}
                                    onClick={() => ajouterDossierATache(d.id)}
                                >
                                    {d.title}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            )}
        </li>
    );
};

export default Tache;