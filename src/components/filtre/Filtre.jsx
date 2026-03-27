import { Etats } from "../../enums/Etats";
import { useTodo } from "../../context/TodoContext";
import "./Filtre.css";

const Tri = [
    { label: "Nom", valeur: "nom" },
    { label: "Date création", valeur: "date_creation" },
    { label: "Date échéance", valeur: "date_echeance" },
];

const Filtre = ({
                    tri,
                    setTri,
                    filtreEtats,
                    setFiltreEtats,
                    filtreDossiers,
                    setFiltreDossiers,
                    enCoursActif,
                    setEnCoursActif }) => {
    const { dossiers } = useTodo();

    const toggleEtat = (etat) => {
        setFiltreEtats((prev) =>
            prev.includes(etat) ? prev.filter((e) => e !== etat) : [...prev, etat]
        );
    };

    const toggleDossier = (id) => {
        setFiltreDossiers((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        );
    };

    return (
        <div className="filtreContainer">

            <div className="filtreSection">
                <span className="filtreLabel">Trier par :</span>
                <div className="filtreBtns">
                    {Tri.map((t) => (
                        <button
                            key={t.valeur}
                            className={`filtreBtn ${tri === t.valeur ? "filtreBtnActive" : ""}`}
                            onClick={() => setTri(t.valeur)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filtreSection">
                <span className="filtreLabel">Afficher :</span>
                <div className="filtreBtns">
                    <button
                        className={`filtreBtn ${enCoursActif ? "filtreBtnActive" : ""}`}
                        onClick={() => setEnCoursActif(!enCoursActif)}
                    >
                        En cours
                    </button>
                </div>
            </div>

            <div className="filtreSection">
                <span className="filtreLabel">États :</span>
                <div className="filtreBtns">
                    {Object.values(Etats).map((etat) => (
                        <button
                            key={etat}
                            className={`filtreBtn ${filtreEtats.includes(etat) ? "filtreBtnActive" : ""}`}
                            onClick={() => toggleEtat(etat)}
                        >
                            {etat}
                        </button>
                    ))}
                </div>
            </div>

            {dossiers.length > 0 && (
                <div className="filtreSection">
                    <span className="filtreLabel">Dossiers :</span>
                    <div className="filtreBtns">
                        {dossiers.map((d) => (
                            <button
                                key={d.id}
                                className={`filtreBtn ${filtreDossiers.includes(d.id) ? "filtreBtnActive" : ""}`}
                                onClick={() => toggleDossier(d.id)}
                            >
                                {d.title}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filtre;