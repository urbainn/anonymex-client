import { Divider, Stack, Typography } from "@mui/material";
import { ButtonGererSession, CarteDeSession } from "./composantsSession";
import { Add, Archive, Download } from "@mui/icons-material";
import theme from "../../theme/theme";
import SessionParentEtape from "./session-modal/SessionParentEtape";
import { useState } from "react";

export default function ComposantSessionPleine({listeSessions}: {listeSessions: Array<{annee: number; id: number; nom: string; statut: 2 | 1 | 3 | 4}>}): React.ReactElement {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Stack justifyContent={'center'} alignItems="start" flexDirection={'row'} divider={<Divider orientation="vertical" flexItem />} spacing={4}>

                <Stack gap={4} flexDirection={'column'} alignItems="start" width={'50%'}>
                    <Stack flexDirection={'column'} alignItems="start">
                        <Typography variant="h4" color={theme.palette.text.secondary} fontWeight="bold">
                            Liste des sessions
                        </Typography>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            Sélectionnez une session en cliquant dessus.
                        </Typography>
                    </Stack>

                    {listeSessions.map((session) => (
                        <CarteDeSession
                            annee={session.annee.toString()}
                            id={session.id}
                            nom={session.nom}
                            nombreStatut={session.statut}                       />
                    ))}
                </Stack>

                <Stack gap={4} flexDirection={'row'} alignItems="center" padding={4}>
                    <ButtonGererSession 
                        icone={<Add sx={{fontSize: 55}}/>} 
                        description={"Nouvelle session"} 
                        onClick={() => setModalOpen(true)} 
                    />
                    <ButtonGererSession icone={<Download sx={{fontSize: 55}}/>} description={"Importer une session passée"} onClick={function (): void {} } />
                    <ButtonGererSession icone={<Archive sx={{fontSize: 55}}/>} description={"Consulter les sessions archivées"} onClick={function (): void {} } />
                </Stack>
            </Stack>

            {modalOpen && (
                <SessionParentEtape onClose={() => setModalOpen(false)} />
            )}
        </>
    );
}