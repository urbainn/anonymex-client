import React from 'react';

import BackupIcon from '@mui/icons-material/Backup';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import PrintIcon from '@mui/icons-material/Print';
import ScienceIcon from '@mui/icons-material/Science';
import TerminalIcon from '@mui/icons-material/Terminal';
import BiotechIcon from '@mui/icons-material/Biotech';
import BalanceIcon from '@mui/icons-material/Balance';
import BuildIcon from '@mui/icons-material/Build';
import GroupsIcon from '@mui/icons-material/Groups';

const defaultIconList = [
    BackupIcon,
    CalendarMonthIcon,
    DriveFileRenameOutlineIcon,
    MenuBookIcon,
    SchoolIcon,
    PrintIcon,
    ScienceIcon,
    TerminalIcon,
    BiotechIcon,
    BalanceIcon,
    BuildIcon,
    GroupsIcon,
];

/**
 * Donne un nouveau nombre aléatoire différent de prevNumber entre 0 et max-1.
 * - prevNumber: nombre précédent (ou null)
 * - max: valeur maximale (exclusive)
 */
export function newRandomNumber(prevNumber: number | null, max: number) {
    if (prevNumber === null) {
        return Math.floor(Math.random() * max);
    }
    let random = prevNumber;
    while (random == prevNumber) {
        random = Math.floor(Math.random() * max);
    }
    return random;
}

/**
 * Génère un ensemble de noeuds d'icônes positionnés en grille.
 * - gap: espacement entre les icônes
 * - iconSize: taille des icônes
 */
export function generateIconNodes(gap: number = 80, iconSize: number = 125) {
    const step = iconSize + gap; // distance entre chaque icone
    const cols = Math.ceil(window.innerWidth / step) + 1;
    const rows = Math.ceil(window.innerHeight / step) + 1;

    const nodes: React.ReactNode[] = []; // création de la liste des noeuds

    let prevIconIndex: number | null = null;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = newRandomNumber(prevIconIndex, defaultIconList.length); // index icone différent du précédent
            prevIconIndex = idx; // mise à jour de l'index précédent

            const IconComp = defaultIconList[idx]; // création du composant icône

            const left = c * step - Math.floor(iconSize / 2);
            const top = r * step - Math.floor(iconSize / 2);

            const node = (
                <IconComp
                    sx={{
                        fontSize: `${iconSize}px`,
                        color: 'rgba(255,255,255,0.6)',
                        position: 'absolute',
                        left: `${left}px`,
                        top: `${top}px`,
                        transform: 'rotate(-45deg)',
                        pointerEvents: 'none',
                    }}
                />
            );
            nodes.push(node); // ajout du noeud à la liste
        }
    }

    return { nodes };
}

export default generateIconNodes;
