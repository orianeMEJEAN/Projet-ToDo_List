import { createContext, useContext, useState, useEffect } from "react";
import datas from "../data/Datas.json";

/**
 * React context used to manage global Todo state
 * (tasks, folders, and relationships between them).
 */
const TodoContext = createContext();

/**
 * Loads data from localStorage if available,
 * otherwise falls back to provided backup data.
 *
 * @param {string} cle - localStorage key
 * @param {any} backup - fallback data if nothing is stored
 * @returns {any} Parsed stored data or backup data
 */
const chargerDonnees = (cle, backup) => {
    const sauvegarde = localStorage.getItem(cle);
    return sauvegarde ? JSON.parse(sauvegarde) : backup;
};

/**
 * Global provider that manages todo application state.
 * Handles persistence, CRUD operations, and backup/reset logic.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - React children components
 *
 * @returns {JSX.Element} Context provider wrapping the application
 */
export const TodoProvider = ({ children }) => {

    /** List of tasks */
    const [taches, setTaches] = useState(() => chargerDonnees("taches", datas.taches));

    /** List of folders */
    const [dossiers, setDossiers] = useState(() => chargerDonnees("dossiers", datas.dossiers));

    /** Relationships between tasks and folders */
    const [relations, setRelations] = useState(() => chargerDonnees("relations", datas.relations));

    /**
     * Persist tasks in localStorage whenever they change
     */
    useEffect(() => {
        localStorage.setItem("taches", JSON.stringify(taches));
    }, [taches]);

    /**
     * Persist folders in localStorage whenever they change
     */
    useEffect(() => {
        localStorage.setItem("dossiers", JSON.stringify(dossiers));
    }, [dossiers]);

    /**
     * Persist relations in localStorage whenever they change
     */
    useEffect(() => {
        localStorage.setItem("relations", JSON.stringify(relations));
    }, [relations]);

    /**
     * Reset the entire application state (empty everything)
     *
     * @function
     * @returns {void}
     */
    const resetComplet = () => {
        setTaches([]);
        setDossiers([]);
        setRelations([]);
    };

    /**
     * Restore initial backup data from JSON file
     *
     * @function
     * @returns {void}
     */
    const revenirBackup = () => {
        setTaches(datas.taches);
        setDossiers(datas.dossiers);
        setRelations(datas.relations);
    };

    /**
     * Add a new task and optionally link it to folders
     *
     * @param {Object} tache - Task data
     * @param {Array<number|string>} dossierIds - Folder IDs linked to the task
     */
    const ajouterTache = (tache, dossierIds = []) => {
        const newId = Date.now();
        setTaches([...taches, { ...tache, id: newId }]);
        const newRelations = dossierIds.map((dossierId) => ({
            tache: newId,
            dossier: dossierId,
        }));
        setRelations([...relations, ...newRelations]);
    };

    /**
     * Add a new folder
     *
     * @param {Object} dossier - Folder data
     */
    const ajouterDossier = (dossier) => {
        const newId = Date.now();
        setDossiers([...dossiers, { ...dossier, id: newId }]);
    };

    /**
     * Update an existing folder
     *
     * @param {number|string} id - Folder ID
     * @param {Object} dossierModifier - Updated folder data
     */
    const modifierDossier = (id, dossierModifier) => {
        setDossiers(dossiers.map((d) => (d.id === id ? { ...d, ...dossierModifier } : d)));
    };

    /**
     * Delete a folder and remove all its relations
     *
     * @param {number|string} id - Folder ID
     */
    const supprimerDossier = (id) => {
        setDossiers(dossiers.filter((d) => d.id !== id));
        setRelations(relations.filter((r) => r.dossier !== id));
    };

    /**
     * Update an existing task
     *
     * @param {number|string} id - Task ID
     * @param {Object} tacheModifiee - Updated task data
     */
    const modifierTache = (id, tacheModifiee) => {
        setTaches(taches.map((t) => (t.id === id ? { ...t, ...tacheModifiee } : t)));
    };

    return (
        <TodoContext.Provider
            value={{
                taches,
                setTaches,
                dossiers,
                setDossiers,
                relations,
                setRelations,
                resetComplet,
                revenirBackup,
                ajouterTache,
                ajouterDossier,
                modifierDossier,
                supprimerDossier,
                modifierTache
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);