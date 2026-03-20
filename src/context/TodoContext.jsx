import { createContext, useContext, useState } from "react";
import datas from "../data/datas.json";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [taches, setTaches] = useState(datas.taches);
    const [dossiers, setDossiers] = useState(datas.dossiers);
    const [relations, setRelations] = useState(datas.relations);

    return (
        <TodoContext.Provider
            value={{
                taches,
                setTaches,
                dossiers,
                setDossiers,
                relations,
                setRelations,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext);