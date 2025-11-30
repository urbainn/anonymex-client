import { Divider, Stack, Typography } from "@mui/material";
import { ButtonGererSession, CarteDeSession } from "./composantsSession";
import { Add, Archive, Download } from "@mui/icons-material";
import type { SessionsStatut } from "../../contracts/sessions";
import theme from "../../theme/theme";


export default function ComposantSessionPleine({listeSessions}: {listeSessions: Array<{date: string; titre: string; status: SessionsStatut}>}): React.ReactElement {

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
                            date={session.date}
                            titre={session.titre}
                            status={session.status}
                        />
                    ))}
                </Stack>

                <Stack gap={4} flexDirection={'row'} alignItems="center" padding={4}>
                    <ButtonGererSession icone={<Add sx={{fontSize: 55}}/>} description={"Nouvelle session"} onClick={function (): void {} } />
                    <ButtonGererSession icone={<Download sx={{fontSize: 55}}/>} description={"Importer une session passée"} onClick={function (): void {} } />
                    <ButtonGererSession icone={<Archive sx={{fontSize: 55}}/>} description={"Consulter les sessions archivées"} onClick={function (): void {} } />
                </Stack>
            </Stack>
        </>
    );
}