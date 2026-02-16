import { Box, Card, CardActionArea, CardActions, Chip, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import type { SessionsStatut } from "../../contracts/sessions";
import { useNavigate } from "react-router-dom";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import DoneIcon from '@mui/icons-material/Done';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import ArchiveIcon from '@mui/icons-material/Archive';
import React, { useState } from "react";
import { DeleteForever, Settings } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import ModalModificationSession from "./session-modal/ModalModificationSession";

type CouleurStatut = { [key in SessionsStatut]: [string, string, React.ElementType] };

type ModalState =
  | { type: "editionSession" ; sessionId: number, sessionName: string, sessionYear: number }
  | { type: "archivageSession" ; sessionId: number, sessionName: string, sessionYear: number }
  | { type: "suppressionSession"; sessionId: number, sessionName: string, sessionYear: number }
  | null;


const Statut: CouleurStatut = {
    1: ["#A2D8B0", 'Active', HourglassBottomIcon], // Icone à revoir
    2: ["#D5D5D5", 'Terminée', DoneIcon],
    3: ["#80A4FF", 'Archivée', ArchiveIcon],
    4: ["#D8A2A3", 'En suppression', AutoDeleteIcon]
};

export function CarteDeSession({id, annee, nom, nombreStatut}: {id: number; annee: string; nom: string; nombreStatut: 1 | 2 | 3 | 4;}): React.ReactElement {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [activeModal, setActiveModal] = useState<ModalState>(null)
    
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    return(
        <>
            <Card key={id} variant="outlined" sx={{cursor: 'pointer', backgroundColor: grey[50], borderRadius: 2}}>
                <CardActionArea onClick={() => navigate(`/sessions/${id}/epreuves`)} sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1}}>

                    {/* Partie gauche de la carte de session (Année - Titre + Statut) */}
                    <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', paddingLeft: 2 }}>
                        <Typography variant="h6" color="textSecondary">{annee} - {nom}</Typography>
                        <Chip sx={{ bgcolor: Statut[nombreStatut][0], px: 1 }} label={Statut[nombreStatut][1]} icon={React.createElement(Statut[nombreStatut][2])}/>
                    </Box>

                    {/* Partie droite de la carte de session (icone menu) */}
                    <CardActions onClick={(e) => e.stopPropagation()}>
                        <IconButton
                            onClick={handleClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </CardActions>

                </CardActionArea>

                {/* Menu déroulant de la carte de session */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        setActiveModal({type: "editionSession", sessionId: id, sessionName: nom, sessionYear: parseInt(annee)});
                    }}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Modifier la session
                    </MenuItem>

                    <MenuItem onClick={() => {
                        handleClose();
                        setActiveModal({type: "archivageSession", sessionId: id, sessionName: nom, sessionYear: parseInt(annee)});
                    }}>
                        <ListItemIcon>
                            <ArchiveIcon fontSize="small" />
                        </ListItemIcon>
                        Archiver la session
                    </MenuItem>
                    
                    <MenuItem onClick={() => {
                        handleClose();
                        setActiveModal({type: "suppressionSession", sessionId: id, sessionName: nom, sessionYear: parseInt(annee)});
                    }}>
                        <ListItemIcon>
                            <DeleteForever fontSize="small" />
                        </ListItemIcon>
                        Supprimer la session
                    </MenuItem>
                </Menu>
            </Card>

            {activeModal && activeModal.type === "editionSession" && (
                <ModalModificationSession session={{id: activeModal.sessionId, nom: activeModal.sessionName, annee: activeModal.sessionYear}} onClose={() => setActiveModal(null)} />
            )}
            {activeModal && activeModal.type === "archivageSession" && (
                <ModalModificationSession session={{id: activeModal.sessionId, nom: activeModal.sessionName, annee: activeModal.sessionYear}} onClose={() => setActiveModal(null)} />
            )}
            {activeModal && activeModal.type === "suppressionSession" && (
                <ModalModificationSession session={{id: activeModal.sessionId, nom: activeModal.sessionName, annee: activeModal.sessionYear}} onClose={() => setActiveModal(null)} />
            )}
        </>
    );
}

export function ButtonGererSession({icone, description, onClick}: {icone: React.ReactNode; description: string; onClick: () => void}): React.ReactElement {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', borderRadius: '10px', border: '2px solid #00000015', padding: '1em', justifyContent: 'space-evenly', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.03)'}} onClick={onClick}>
            {icone}
            <Typography variant="h6" sx={{fontWeight: "400"}} lineHeight={"1.5"} color="textSecondary" textAlign={'center'}>{description}</Typography>
        </Box>
    );
}

