import React from 'react';
import { useState } from "react";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Button } from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material';
import appColors from '../theme/colors';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BackgroundIcon from '../components/BackgroundIcon';

export default function Login() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
    <>
        <BackgroundIcon>
            <Box component="div" sx={{ bgcolor: '#ffffffff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '34px' }}>
                <Typography variant="h3" sx={{color: appColors.text.primary, margin: '1rem 2rem', fontWeight: 700}}>Anonymex</Typography>

                <FormControl sx={{ margin: '1rem 5rem', width: '80%'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        type='email'
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl sx={{ margin: '1rem 5rem', width: '80%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                    />
                    </FormControl>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ borderRadius: '20px', margin: '2rem 5rem' }}
                        disabled={!/^\S+@\S+\.\S+$/.test(email) || password.trim().length < 5}
                    >
                        Connexion
                    </Button>
            </Box>
        </BackgroundIcon>
    </>
    );
}
