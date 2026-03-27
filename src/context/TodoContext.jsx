import { createContext, useContext, useState, useEffect } from "react";
import datas from "../data/Datas.json";

const TodoContext = createContext();

const chargerDonnees = (cle, backup) => {
    const sauvegarde = localStorage.getItem(cle);
    return sauvegarde ? JSON.parse(sauvegarde) : backup;
};

export const TodoProvider = ({ children }) => {
    const [taches, setTaches] = useState(() => chargerDonnees("taches", datas.taches));
    const [dossiers, setDossiers] = useState(() => chargerDonnees("dossiers", datas.dossiers));
    const [relations, setRelations] = useState(() => chargerDonnees("relations", datas.relations));

    useEffect(() => {
        localStorage.setItem("taches", JSON.stringify(taches));
    }, [taches]);

    useEffect(() => {
        localStorage.setItem("dossiers", JSON.stringify(dossiers));
    }, [dossiers]);

    useEffect(() => {
        localStorage.setItem("relations", JSON.stringify(relations));
    }, [relations]);

    const resetComplet = () => {
        setTaches([]);
        setDossiers([]);
        setRelations([]);
    };

    const revenirBackup = () => {
        setTaches(datas.taches);
        setDossiers(datas.dossiers);
        setRelations(datas.relations);
    };

    const ajouterTache = (tache, dossierIds = []) => {
        const newId = Date.now();
        setTaches([...taches, { ...tache, id: newId }]);
        const newRelations = dossierIds.map((dossierId) => ({
            tache: newId,
            dossier: dossierId,
        }));
        setRelations([...relations, ...newRelations]);
    };

    const ajouterDossier = (dossier) => {
        const newId = Date.now();
        setDossiers([...dossiers, { ...dossier, id: newId }]);
    };

    const modifierDossier = (id, dossierModifier) => {
        setDossiers(dossiers.map((d) => (d.id === id ? { ...d, ...dossierModifier } : d)));
    };

    const supprimerDossier = (id) => {
        setDossiers(dossiers.filter((d) => d.id !== id));
        setRelations(relations.filter((r) => r.dossier !== id));
    };

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