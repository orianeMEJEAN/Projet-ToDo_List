import { useState } from "react";
import {Etats} from "../../enums/Etats";
import "./ModelTache.css";
import { useTodo } from "../../context/TodoContext";

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

const ModelTache = ({ onConfirm, onCancel }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateEcheance, setDateEcheance] = useState("");
    const [etat, setEtat] = useState(Etats.NOUVEAU);
    const [equipiers, setEquipiers] = useState([]);
    const [equipierInput, setEquipierInput] = useState("");
    const [erreurs, setErreurs] = useState({});
    const { dossiers } = useTodo();
    const [dossiersSelectionner, setDossiersSelectionner] = useState([]);

    const valider = () => {
        const newErreurs = {};
        if (title.trim().length < 5)
        {
            newErreurs.title = "Le titre doit faire au moins 5 caractères.";
        }

        if (!dateEcheance)
        {
            newErreurs.dateEcheance = "La date d'échéance est obligatoire.";
        }

        setErreurs(newErreurs);
        return Object.keys(newErreurs).length === 0;
    };

    const handleSubmit = () => {
        if (!valider()) return;
        onConfirm(
            {
                title: title.trim(),
                description,
                date_creation: new Date().toISOString().split("T")[0],
                date_echeance: dateEcheance,
                etat,
                equipiers: equipiers.map((name) => ({ name })),
            },
            dossiersSelectionner
        );
    };

    const ajouterEquipier = () => {
        const nom = equipierInput.trim();

        if (nom && !equipiers.includes(nom))
        {
            setEquipiers([...equipiers, nom]);
            setEquipierInput("");
        }
    };

    const supprimerEquipier = (nom) => {
        setEquipiers(equipiers.filter((e) => e !== nom));
    };

    const toggleDossier = (id) => {
        setDossiersSelectionner((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        );
    };

    return (
        <div className="modelOverlay">
            <div className="modelBox">
                <h2 className="modelTitre">Nouvelle tâche</h2>

                <div className="modelField">
                    <label>Titre *</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Min. 5 caractères"
                    />
                    {erreurs.title && <span className="modelErreur">{erreurs.title}</span>}
                </div>

                <div className="modelField">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optionnelle"
                        rows={3}
                    />
                </div>

                <div className="modelField">
                    <label>Date d'échéance *</label>
                    <input
                        type="date"
                        value={dateEcheance}
                        onChange={(e) => setDateEcheance(e.target.value)}
                    />
                    {erreurs.dateEcheance && (
                        <span className="modelErreur">{erreurs.dateEcheance}</span>
                    )}
                </div>

                <div className="modelField">
                    <label>Statut</label>
                    <select value={etat} onChange={(e) => setEtat(e.target.value)}>
                        {Object.values(Etats).map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))}
                    </select>
                </div>

                <div className="modelField">
                    <label>Équipiers</label>
                    <div className="modelEquipierInput">
                        <input
                            type="text"
                            value={equipierInput}
                            onChange={(e) => setEquipierInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && ajouterEquipier()}
                            placeholder="Nom et/ou Prénom"
                        />
                        <button className="equipierAddBtn" onClick={ajouterEquipier}>
                            +
                        </button>
                    </div>

                    <div className="modelEquipiersListe">
                        {equipiers.map((nom) => (
                            <span key={nom} className="equipierTag">
                                {nom}
                                <button onClick={() => supprimerEquipier(nom)}>✕</button>
                            </span>
                        ))}
                    </div>
                </div>

                {dossiers.length > 0 && (
                    <div className="modalField">
                        <label>Dossiers</label>
                        <div className="modalDossiersListe">
                            {dossiers.map((d) => {
                                const couleur = dossier_colors[d.color] || "#888";
                                const estSelectionne = dossiersSelectionner.includes(d.id);
                                return (
                                    <button
                                        key={d.id}
                                        className="dossierSelectBtn"
                                        onClick={() => toggleDossier(d.id)}
                                        style={{
                                            background: estSelectionne ? couleur : "#26aecc",
                                            color: estSelectionne ? "#ffffff" : "#000000",
                                            border: `2px solid ${estSelectionne ? couleur : "transparent"}`,
                                        }}
                                    >
                                        {d.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="modelActions">
                    <button className="modelBtn modelBtnConfirmTache" onClick={handleSubmit}>
                        Créer
                    </button>
                    <button className="modelBtn modelBtnCancelTache" onClick={onCancel}>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModelTache;