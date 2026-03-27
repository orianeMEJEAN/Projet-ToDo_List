import { useState } from "react";
import { Etats } from "../../enums/Etats";
import { useTodo } from "../../context/TodoContext";
import "./Filtre.css";

/**
 * Sorting options available in the filter component.
 * @type {{label: string, valeur: string}[]}
 */
const Tri = [
    { label: "Nom", valeur: "nom" },
    { label: "Date création", valeur: "date_creation" },
    { label: "Date échéance", valeur: "date_echeance" },
];

/**
 * Filter component used to sort and filter tasks by multiple criteria.
 *
 * @component
 * @param {Object} props - Component props
 *
 * @param {string} props.tri - Current sorting criteria
 * @param {string[]} props.filtreEtats - Selected status filters
 *
 * @param {Function} props.setTri - Function to update sorting criteria
 * @param {Function} props.setFiltreEtats - Function to update status filters
 * @param {Function} props.setFiltreDossiers - Function to update folder filters
 * @param {Function} props.setEnCoursActif - Function to toggle active task filter
 *
 * @param {Array<number|string>} props.filtreDossiers - Selected folder filters
 *
 * @param {boolean} props.enCoursActif - Toggle to show only active tasks
 *
 * @returns {JSX.Element} The rendered filter panel
 */
const Filtre = ({
                    tri,
                    setTri,
                    filtreEtats,
                    setFiltreEtats,
                    filtreDossiers,
                    setFiltreDossiers,
                    enCoursActif,
                    setEnCoursActif }) => {

    /** Context providing available folders */
    const { dossiers } = useTodo();

    /** @type {[boolean, Function]} Toggle for opening/closing filter panel */
    const [ouvert, setOuvert] = useState(false);

    /**
     * Toggles a status filter on/off.
     *
     * @function
     * @param {string} etat - Status to toggle
     * @returns {void}
     */
    const toggleEtat = (etat) => {
        setFiltreEtats((prev) =>
            prev.includes(etat) ? prev.filter((e) => e !== etat) : [...prev, etat]
        );
    };

    /**
     * Toggles a folder filter on/off.
     *
     * @function
     * @param {number|string} id - Folder ID
     * @returns {void}
     */
    const toggleDossier = (id) => {
        setFiltreDossiers((prev) =>
            prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
        );
    };

    return (
        <div className="filtreContainer">

            <div className="filtreHeader" onClick={() => setOuvert(!ouvert)}>
                <span className="filtreTitre">Tri & Filtres</span>
                <button className={`filtreToggle ${ouvert ? "filtreToggleOpen" : ""}`}>
                    ▶
                </button>
            </div>

            {ouvert && (
                <div className="filtreContenu">
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

                            <button
                                className={`filtreBtn ${enCoursActif ? "filtreBtnActive" : ""}`}
                                onClick={() => setEnCoursActif(!enCoursActif)}
                            >
                                Tâche active
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
            )}
        </div>
    );
};

export default Filtre;