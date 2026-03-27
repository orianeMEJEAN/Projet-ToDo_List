import logo from "../../logo.svg";
import { useTodo } from "../../context/TodoContext";
import { ETAT_TERMINE, Etats } from "../../enums/Etats";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Header.css";

/**
 * Mapping between task status and display colors.
 * @type {Object.<string, string>}
 */
const etat_colors = {
    "Nouveau": "#60d8f9",
    "En cours": "#f9a825",
    "En attente": "#ab47bc",
    "Réussi": "#66bb6a",
    "Abandonné": "#ef5350",
};

/**
 * Header component displaying global task statistics
 * and a pie chart visualization of task distribution by status.
 *
 * @component
 * @returns {JSX.Element} The rendered application header
 */
const Header = () => {

    /** Context providing all tasks **/
    const { taches } = useTodo();

    /** Total number of tasks **/
    const nbTotal = taches.length;

    /** Number of unfinished tasks **/
    const nbNonTerminees = taches.filter((t) => !ETAT_TERMINE.includes(t.etat)).length;

    /**
     * Data formatted for the pie chart.
     * Each entry represents a task status and its count.
     *
     * @type {{name: string, value: number}[]}
     */
    const dataCamembert = Object.values(Etats).map((etat) => ({
        name: etat,
        value: taches.filter((t) => t.etat === etat).length,
    })).filter((d) => d.value > 0);

    /**
     * Reloads the page when the logo is clicked.
     *
     * @function
     * @returns {void}
     */
    const refreshPage = () => window.location.reload();

    return (
        <header className="header">
            <img src={logo} alt="logo" onClick={refreshPage} />
            <h1 className="headerTitre">ToDo-List</h1>
            <div className="headerStats">
                <div className="headerStat">
                    <span className="headerStatNombre">{nbTotal}</span>
                    <span className="headerStatLabel">tâches au total</span>
                </div>
                <div className="headerSeparateur" />
                <div className="headerStat">
                    <span className="headerStatNombre headerStatNombreEncours">{nbNonTerminees}</span>
                    <span className="headerStatLabel">non terminées</span>
                </div>
            </div>

            {dataCamembert.length > 0 && (
                <div className="headerCamembert">
                    <PieChart width={80} height={80}>
                        <Pie
                            data={dataCamembert}
                            cx={35}
                            cy={35}
                            innerRadius={18}
                            outerRadius={35}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {dataCamembert.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={etat_colors[entry.name] || "#888"}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value, name) => [`${value} tâche${value > 1 ? "s" : ""}`, name]}
                            contentStyle={{
                                background: "#022225",
                                border: "none",
                                borderRadius: "8px",
                                color: "#fff",
                                fontSize: "0.75rem",
                            }}
                        />
                    </PieChart>

                    <div className="headerLegende">
                        {dataCamembert.map((entry) => (
                            <div key={entry.name} className="headerLegendeItem">
                    <span
                        className="headerLegendeCouleur"
                        style={{ backgroundColor: etat_colors[entry.name] || "#888" }}
                    />
                                <span className="headerLegendeLabel">
                        {entry.name} ({entry.value})
                    </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;