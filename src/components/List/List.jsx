import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/etats";
import Tache from "../Tache/Tache";
import "./List.css";

const List = () => {
    const { taches, dossiers, relations } = useTodo();

    // Filtre par défaut : on exclut les tâches terminées
    const tachesFiltrees = taches
        .filter((tache) => !ETAT_TERMINE.includes(tache.etat))
        .sort((a, b) => new Date(b.date_echeance) - new Date(a.date_echeance));

    // Récupère les dossiers associés à une tâche
    const getDossiersDeTache = (tacheId) => {
        return relations
            .filter((rel) => rel.tache === tacheId)
            .map((rel) => dossiers.find((d) => d.id === rel.dossier))
            .filter(Boolean); // on enlève les undefined si un dossier n'existe pas
    };

    return (
        <div className="list-container">
            <p className="list-info">
                {tachesFiltrees.length} tâche{tachesFiltrees.length > 1 ? "s" : ""} en cours
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
