import { createContext, useContext, useState } from "react";
import datas from "../data/Datas.json";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [taches, setTaches] = useState(datas.taches);
    const [dossiers, setDossiers] = useState(datas.dossiers);
    const [relations, setRelations] = useState(datas.relations);

    const resetComplet = () => {
        setTaches([]);
        setDossiers([]);
        setRelations([]);
    };

    const rechargerJSON = () => {
        setTaches(datas.taches);
        setDossiers(datas.dossiers);
        setRelations(datas.relations);
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
                rechargerJSON,
                ajouterDossier,
                modifierDossier,
                supprimerDossier,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);