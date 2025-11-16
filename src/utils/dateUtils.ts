const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const moisAnnee = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/**
 * Prend un "date entière" (nombre de jours depuis epoch) et retourne un format lisible (Lundi 12 janvier 2029)
 * @param dateEntiere nb. de jours depuis epoch
 * @returns chaîne de caractères formatée
 */
export function formatterDateEntiere(dateEntiere: number): string {
    const date = new Date(dateEntiere * 86400000);
    const jourSemaine = joursSemaine[date.getDay()];
    const jourMois = date.getDate();
    const mois = moisAnnee[date.getMonth()];
    return `${jourSemaine} ${jourMois} ${mois}`;
}