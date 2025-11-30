import React from 'react';
import { Modal } from '../../components/Modal';
import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { Archive, FolderCopyOutlined } from '@mui/icons-material';


export default function SessionModal({onClose}: {onClose: () => void}): React.ReactElement {

    const [nomSession, setNomSession] = React.useState('');
    const [date, setDate] = React.useState('');

    return (
        <Modal onClose={onClose} titre={"Création d'une nouvelle session"}>
            <Typography variant="body1" color="textSecondary" textAlign={'center'}>
                Ou
            </Typography>

            <Stack flex={1} divider={<Divider orientation="vertical" flexItem />} margin={8} direction={"row"} spacing={4} justifyContent="center" alignItems="center">

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <TextField fullWidth helperText="ex: Session 1 Pair" label="Nom de la session" type="text" value={nomSession} onChange={(e) => setNomSession(e.target.value)} />
                    <TextField fullWidth helperText="ex: 2021" label="Date" type="number" value={date} onChange={(e) => setDate(e.target.value)} />

                    <Button variant="contained" size="medium"  startIcon={<FolderCopyOutlined />} color="secondary" sx={{margin: 3, borderRadius: '20px'}}>Configuration du bordereau</Button>

                    <Button type="submit" variant="contained" size="medium" color="primary" sx={{margin: 3, borderRadius: '20px'}}>Créer la session</Button>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, border: '2px dashed grey', borderRadius: '20px', cursor: 'pointer', marginTop: 2}} onClick={() => {}}>
                    <Archive />
                    <Typography variant="body1" color="textSecondary">Importer une session</Typography>
                    <Typography variant="caption" color="textSecondary">formats acceptés: .json, .csv</Typography>
                </Box>

            </Stack>
        </Modal>
    );
}
