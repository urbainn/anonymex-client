import { Avatar, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme/theme';
import LinkIcon from '@mui/icons-material/Link';
import { Add } from '@mui/icons-material';
import { Modal } from '../../components/Modal';

export default function SessionPage(): React.ReactElement {

    const [modalOuvert, setModalOuvert] = React.useState(false);

    const openModal = () => {
        setModalOuvert(true);
    };

    const closeModal = () => {
        setModalOuvert(false);
    };

    return (
        <>
            <Stack height={'100vh'} width={'100vw'} flexDirection={'column'}>
                <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems="center" margin={4}>
                    <Stack flexDirection={'column'} alignItems="baseline">
                        <Typography variant="h4" color='#00000060'>
                            Accueil
                        </Typography>
                        <Typography variant="h3" color={theme.palette.text.primary} fontWeight="bold">
                            Anonymex
                        </Typography>
                    </Stack>

                    <Stack gap={4} flexDirection={'row'} alignSelf="flex-start">
                        <Button variant="contained" disabled color="primary" startIcon={<LinkIcon />} sx={{borderRadius: '20px', textTransform: 'none'}}>
                            Inviter un utilisateur
                        </Button>
                        <Avatar sx={{bgcolor: theme.palette.primary.main}}>CC</Avatar>
                    </Stack>
                </Stack>

                <Stack justifyContent={'center'} alignItems="center" marginTop={20}>
                    <Typography variant="h4" color={theme.palette.text.primary} fontWeight="bold">
                        Aucune session n'a été trouvée
                    </Typography>
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                        Cliquez sur le bouton ci-dessous pour en créer une nouvelle.
                    </Typography>
                    <Button variant="contained" size="medium" color="primary" sx={{margin: 3, borderRadius: '20px'}} startIcon={<Add />} onClick={openModal}>
                        Ajouter une session
                    </Button>
                </Stack>
                
                {modalOuvert && (
                    <Modal onClose={closeModal} titre={"Création d'une nouvelle session"}>
                        <div>Test</div>
                    </Modal>
                )}

            </Stack>
        </>
    );
}