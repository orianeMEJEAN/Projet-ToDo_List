import { createContext, useContext, useState } from "react";
import datas from "../data/datas.json";

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
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);