const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const moisAnnee = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/**
 * Prend un "date entière" (nombre de jours depuis epoch) et retourne un format lisible (Lundi 12 janvier 2029 09h30)
 * @param dateEntiere nb. de jours depuis epoch
 * @returns chaîne de caractères formatée
 */
export function formatterDateEntiere(dateEntiere: number): string {
    const date = new Date(dateEntiere * 60000);
    const jourSemaine = joursSemaine[date.getDay()];
    const jourMois = date.getDate();
    const mois = moisAnnee[date.getMonth()];
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${jourSemaine} ${jourMois} ${mois} ${heures}h${minutes}`;
}