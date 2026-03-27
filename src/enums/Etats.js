/**
 * Enumeration of all possible task states in the application.
 * These values represent the business statuses used for tasks.
 *
 * @readonly
 * @enum {string}
 */
export const Etats = {
    NOUVEAU: 'Nouveau',
    EN_COURS: 'En cours',
    REUSSI: 'Réussi',
    EN_ATTENTE: 'En attente',
    ABANDONNE: 'Abandonné',
}

/**
 * List of terminal task states.
 * Tasks with these states are considered finished and
 * are excluded from "active tasks" filters.
 *
 * @type {string[]}
 */
export const ETAT_TERMINE = [
    Etats.REUSSI,
    Etats.ABANDONNE,
]

