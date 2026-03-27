import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/Etats";
import Tache from "../tache/Tache";
import Filtre from "../filtre/Filtre";
import "./List.css";

/**
 * Component that displays the list of tasks with sorting and filtering options.
 *
 * @component
 * @returns {JSX.Element} The rendered task list with filters
 */
const List = () => {

    /** Context providing tasks, folders, and relations **/
    const { taches, dossiers, relations } = useTodo();

    /** @type {[string, Function]} Sorting criteria **/
    const [tri, setTri] = useState("date_echeance");

    /** @type {[string[], Function]} Selected status filters **/
    const [filtreEtats, setFiltreEtats] = useState([]);

    /** @type {[number[], Function]} Selected folder filters **/
    const [filtreDossiers, setFiltreDossiers] = useState([]);

    /** @type {[boolean, Function]} Toggle to show only ongoing tasks **/
    const [enCoursActif, setEnCoursActif] = useState(true);

    /**
     * Retrieves all folders associated with a given task.
     *
     * @function
     * @param {number|string} tacheId - Task ID
     * @returns {Object[]} List of associated folders
     */
    const getDossiersDeTache = (tacheId) => {
        return relations
            .filter((rel) => rel.tache === tacheId)
            .map((rel) => dossiers.find((d) => d.id === rel.dossier))
            .filter(Boolean);
    };

    /** Copy of tasks to apply filters and sorting **/
    let tachesFiltrees = [...taches];

    /**
     * Filter: only keep tasks that are not finished
     */
    if (enCoursActif)
    {
        tachesFiltrees = tachesFiltrees.filter(
            (t) => !ETAT_TERMINE.includes(t.etat)
        );
    }

    /**
     * Filter: by selected statuses
     */
    if (filtreEtats.length > 0)
    {
        tachesFiltrees = tachesFiltrees.filter((t) =>
            filtreEtats.includes(t.etat)
        );
    }

    /**
     * Filter: by selected folders
     */
    if (filtreDossiers.length > 0)
    {
        tachesFiltrees = tachesFiltrees.filter((t) =>
            relations.some(
                (r) => r.tache === t.id && filtreDossiers.includes(r.dossier)
            )
        );
    }

    /**
     * Sort tasks based on selected criteria
     *
     * - "nom": alphabetical order
     * - "date_creation": newest first
     * - default: due date (latest first)
     */
    tachesFiltrees.sort((a, b) => {
        if (tri === "nom")
        {
            return a.title.localeCompare(b.title);
        }

        if (tri === "date_creation")
        {
            return new Date(b.date_creation) - new Date(a.date_creation);
        }

        return new Date(b.date_echeance) - new Date(a.date_echeance);
    });

    return (
        <div className="listContainer">
            <Filtre
                tri={tri} setTri={setTri}
                filtreEtats={filtreEtats} setFiltreEtats={setFiltreEtats}
                filtreDossiers={filtreDossiers} setFiltreDossiers={setFiltreDossiers}
                enCoursActif={enCoursActif} setEnCoursActif={setEnCoursActif}
            />
            <p className="listInfo">
                {tachesFiltrees.length} tâche{tachesFiltrees.length > 1 ? "s" : ""}
            </p>
            <ul className="list">
                {tachesFiltrees.map((tache) => (
                    <Tache
                        key={tache.id}
                        tache={tache}
                        dossiers={getDossiersDeTache(tache.id)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default List;