import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/Etats";
import "./Tache.css";

const etat_colors = {
    "Nouveau": "#60d8f9",
    "En cours": "#f9a825",
    "En attente": "#ab47bc",
    "Réussi": "#66bb6a",
    "Abandonné": "#ef5350",
};

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

const Tache = ({ tache, dossiers }) => {
    const { modifierTache, dossiers: tousLesDossiers, relations, setRelations } = useTodo();
    const [modeEdition, setModeEdition] = useState(false);
    const [showAjoutDossier, setShowAjoutDossier] = useState(false);
    const [editTitle, setEditTitle] = useState(tache.title);
    const [editDescription, setEditDescription] = useState(tache.description);
    const [editDateEcheance, setEditDateEcheance] = useState(tache.date_echeance);
    const [erreurEdit, setErreurEdit] = useState("");

    const [modeComplet, setModeComplet] = useState(false);
    const { title, description, date_echeance, etat, equipiers } = tache;
    const dossiersAffiches = modeComplet ? dossiers : dossiers.slice(0, 2);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

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

    const handleAnnulerEdition = () => {
        setEditTitle(tache.title);
        setEditDescription(tache.description);
        setEditDateEcheance(tache.date_echeance);
        setModeEdition(false);
        setErreurEdit("");
    };

    const dossiersDisponibles = tousLesDossiers.filter(
        (d) => !dossiers.find((dos) => dos.id === d.id)
    );

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