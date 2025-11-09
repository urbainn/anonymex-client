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
import GroupsIcon from '@mui/icons-material/Groups';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CheckIcon from '@mui/icons-material/Check';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
    GroupsIcon,
    ArtTrackIcon,
    BusinessCenterIcon,
    CheckIcon,
    CoPresentIcon,
    SettingsIcon,
    EmojiEventsIcon
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
    const cols = Math.floor(window.innerWidth / step) + 1;
    const rows = Math.floor(window.innerHeight / step) + 1;

    // Calculer la différence x et y pour centrer la grille
    const diffX = (window.innerWidth - cols * step + gap) / 2;
    const diffY = (window.innerHeight - rows * step + gap) / 2;

    const nodes: React.ReactNode[] = []; // création de la liste des noeuds

    let prevIconIndex: number | null = null;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = newRandomNumber(prevIconIndex, defaultIconList.length); // index icone différent du précédent
            prevIconIndex = idx; // mise à jour de l'index précédent

            const IconComp = defaultIconList[idx]; // création du composant icône

            const left = c * step + diffX;
            const top = r * step + diffY;

            const node = (
                <IconComp
                    sx={{
                        fontSize: `${iconSize}px`,
                        color: 'rgba(255,255,255,0.5)',
                        position: 'absolute',
                        left: `${left}px`,
                        top: `${top}px`,
                        transform: 'rotate(-30deg)',
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
