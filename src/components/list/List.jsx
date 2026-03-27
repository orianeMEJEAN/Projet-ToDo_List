import { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE } from "../../enums/Etats";
import Tache from "../tache/Tache";
import Filtre from "../filtre/Filtre";
import "./List.css";

const List = () => {
    const { taches, dossiers, relations } = useTodo();

    const [tri, setTri] = useState("date_echeance");
    const [filtreEtats, setFiltreEtats] = useState([]);
    const [filtreDossiers, setFiltreDossiers] = useState([]);
    const [enCoursActif, setEnCoursActif] = useState(true);

    const getDossiersDeTache = (tacheId) => {
        return relations
            .filter((rel) => rel.tache === tacheId)
            .map((rel) => dossiers.find((d) => d.id === rel.dossier))
            .filter(Boolean);
    };

    let tachesFiltrees = [...taches];

    if (enCoursActif)
    {
        tachesFiltrees = tachesFiltrees.filter(
            (t) => !ETAT_TERMINE.includes(t.etat)
        );
    }

    if (filtreEtats.length > 0)
    {
        tachesFiltrees = tachesFiltrees.filter((t) =>
            filtreEtats.includes(t.etat)
        );
    }

    if (filtreDossiers.length > 0)
    {
        tachesFiltrees = tachesFiltrees.filter((t) =>
            relations.some(
                (r) => r.tache === t.id && filtreDossiers.includes(r.dossier)
            )
        );
    }

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
        <div className="list-container">
            <Filtre
                tri={tri} setTri={setTri}
                filtreEtats={filtreEtats} setFiltreEtats={setFiltreEtats}
                filtreDossiers={filtreDossiers} setFiltreDossiers={setFiltreDossiers}
                enCoursActif={enCoursActif} setEnCoursActif={setEnCoursActif}
            />
            <p className="list-info">
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