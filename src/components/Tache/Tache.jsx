import { useState } from "react";
import "./Tache.css";
import logo from "../../logo.svg";

const etat_colors = {
    "Nouveau": "#60d8f9",
    "En cours": "#f9a825",
    "En attente": "#ab47bc",
    "Terminé": "#66bb6a",
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

    return (
        <li className={`tache ${modeComplet ? "tacheComplet" : ""}`}>

            <div className="tache_header">
                <div className="tacheHeaderLeft">
                    <span
                        className="tacheEtatBadge"
                        style={{ backgroundColor: etat_colors[etat] || "#ccc" }}
                    >
                        {etat}
                    </span>
                    <span className="tacheTitle">{title}</span>
                </div>

                <div className="tacheHeaderRight">
                    <span className="tacheDate">{formatDate(date_echeance)}</span>
                    <button
                        className={`tacheToggle ${modeComplet ? "tacheToggleOpen" : ""}`}
                        onClick={() => setModeComplet(!modeComplet)}
                        title={modeComplet ? "Réduire" : "Voir plus"}
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
                    {description ? (
                        <p className="tacheDescription">{description}</p>
                    ) : (
                        <p className="tacheDescription tacheDescriptionEmpty">
                            Aucune description
                        </p>
                    )}
                    {equipiers && equipiers.length > 0 && (
                        <div className="tacheEquipiers">
                            <span className="tacheEquipiersLabel">👥 Équipiers :</span>
                            {equipiers.map((eq, index) => (
                                <span key={index} className="tacheEuipierTag">
                                    {eq.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </li>
    );
};

export default Tache;
