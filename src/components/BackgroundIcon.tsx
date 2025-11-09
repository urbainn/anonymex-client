import React, { useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import appColors from '../theme/colors';

import generateIconNodes from './IconGeneration';

type BackgroundIconProps = {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    className?: string;
};

export default function BackgroundIcon({ children, sx, className }: BackgroundIconProps) {
    const styleContainer: SxProps<Theme> = {
        backgroundColor: appColors.background.default,
        height: '100vh',
        minWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
        padding: '0',
        position: 'relative',
        overflow: 'hidden',
    };

    const [iconNodes, setIconNodes] = useState<React.ReactNode[]>([]);

    function compute() {
            const { nodes } = generateIconNodes(80, 125);
            setIconNodes(nodes);
    }

    useEffect(() => {
        compute();
        const onResize = () => compute();
        window.addEventListener('resize', onResize); // recalculer les icônes au redimensionnement de la fenêtre (utile ?)
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <Container className={className} sx={{ ...styleContainer, ...(sx as object) }}>
            {/*Overlay des icônes en fond pour éviter les interactions avec le formulaire*/}
            <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                {iconNodes}
            </Box>

            <Box sx={{ zIndex: 1, position: 'relative', pointerEvents: 'auto' }}>
                {children}
            </Box>
        </Container>
    );
}