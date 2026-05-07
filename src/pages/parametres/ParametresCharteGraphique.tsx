
import React, { useEffect } from 'react';
import { Stack, Container, Box, Button, Typography, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { URL_API_BASE } from '../../utils/api';
import { getParametresCharteGraphique } from '../../contracts/parametres';

interface LogoUploadSectionProps {
    label: string;
    imageUrl?: string | null;
    uploadUrl: string;
}

export default function SectionParametresCharteGraphique() {
    const [imageUniversite, setImageUniversite] = React.useState<string | null>(null);
    const [imageFaculte, setImageFaculte] = React.useState<string | null>(null);

    useEffect(() => {
        // Charger les paramètres (dont images)
        const fetchParametres = async () => {
            const res = await getParametresCharteGraphique();
            if (res.status === 200 && res.data) {
                const { logoUniversite, logoFaculte } = res.data;
                setImageUniversite(logoUniversite);
                setImageFaculte(logoFaculte);
            } else {
                throw new Error('Erreur lors du chargement des paramètres de charte graphique');
            }
        };
        fetchParametres();
    }, []);

    return (
        <Container maxWidth="sm">
            <Stack spacing={4}>
                <Stack>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Charte Graphique
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Personnaliser les logos apposés sur les documents générés. Les images sont converties en niveau de gris, privilégier les variantes monochromes ou noir sur fond blanc. Format 7x3 recommandé.
                    </Typography>
                </Stack>

                <LogoUploadSection
                    label="Logo de l'Université"
                    imageUrl={imageUniversite}
                    uploadUrl={`${URL_API_BASE}/parametres/charte-graphique/logo/universite`}
                />
                <LogoUploadSection
                    label="Logo Département / Faculté"
                    imageUrl={imageFaculte}
                    uploadUrl={`${URL_API_BASE}/parametres/charte-graphique/logo/faculte`}
                />

            </Stack>
        </Container>
    );
}

/**
 * Zone d'upload/visualisation d'un logo
 * @returns 
 */
function LogoUploadSection({ label, imageUrl, uploadUrl }: LogoUploadSectionProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = React.useState(false);

    const [preview, setPreview] = React.useState<string | null>(imageUrl ?? null);
    const [file, setFile] = React.useState<File | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        setPreview(imageUrl ?? null);
    }, [imageUrl]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const f = event.target.files?.[0];
        if (f) {
            setFile(f);
            setError(null);
            setSuccess(false);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target?.result as string);
            reader.readAsDataURL(f);
        }
    };

    const handleChangeClick = () => fileInputRef.current?.click();

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(uploadUrl, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Erreur lors de l\'upload');
            setFile(null);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack spacing={1}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>

            <Box
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                sx={{
                    position: 'relative',
                    width: '350px',
                    height: '150px',
                    aspectRatio: '4 / 3',
                    backgroundColor: '#e0e0e0',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {preview ? (
                    <>
                        <Box
                            component="img"
                            src={preview}
                            alt={label}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                padding: 1,
                            }}
                        />
                        {isHovering && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background-color 200ms',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon />}
                                    onClick={handleChangeClick}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Modifier
                                </Button>
                            </Box>
                        )}
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleChangeClick}
                        sx={{ textTransform: 'none' }}
                    >
                        Choisir une image
                    </Button>
                )}
            </Box>

            <Typography variant="caption" color="textSecondary">
                Formats acceptés : PNG, JPG, JPEG.
            </Typography>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={handleFileSelect}
            />

            {file && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={isLoading}
                    sx={{ textTransform: 'none', marginTop: 1 }}
                >
                    {isLoading ? 'Sauvegarde en cours...' : 'Sauvegarder'}
                </Button>
            )}

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Logo sauvegardé avec succès</Alert>}
        </Stack>
    );
}