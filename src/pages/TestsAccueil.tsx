import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestsAccueil() {

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const [email, setEmail] = React.useState<string>('');

    const navigate = useNavigate();


    return (
        <>
            <Stack spacing={2} alignItems={'center'} justifyContent={'center'} sx={{height: '100vh'}}> 
                <Button variant="contained" color="primary" sx={{borderRadius: '20px'}} onClick={handleClickOpen}>
                    Invitez un utilisateur
                </Button>

                <Button variant="contained" color="primary" sx={{borderRadius: '20px'}} onClick={() => navigate("/signup")}>
                    S'inscrire
                </Button>
            </Stack>

            <Dialog open={openModal} onClose={handleClose} /*onSubmit={generateInvitationLink}*/>
                <DialogTitle>Invitez un utilisateur</DialogTitle>
                <DialogContent>

                    <DialogContentText>
                        Pour inviter un utilisateur, veuillez entrer son adresse email ici. 
                        Un lien unique et nominatif valable pendant 48h sera créé pour que l'utilisateur puisse créer son compte.
                    </DialogContentText>

                    <FormControl sx={{ width: '80%', margin: '1rem 0rem'}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-email">E-mail</InputLabel>
                                    <Input
                                        id="standard-adornment-email"
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                    </FormControl>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button type="submit" form="subscription-form" onClick={() => setIsLoading(true)} sx={{display: isLoading ? "none": "flex"}} disabled={isLoading || !/^\S+@\S+\.\S+$/.test(email)}>
                        Créer un lien 
                    </Button>
                    <Button loading sx={{display: isLoading ? 'flex' : 'none'}} loadingPosition="end">
                        Chargement
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}