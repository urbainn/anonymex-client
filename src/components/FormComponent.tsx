import React from "react";
import {
    Alert,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type FieldType =
    | "email"
    | "password"
    | "password-confirm"
    | "text"
    | "firstname"
    | "lastname";

export interface Field {
    name: string;
    type: FieldType;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    required?: boolean;
}

interface FormComponentProps {
    title: string;
    description?: string;
    display?: React.CSSProperties["display"];
    fields: Field[];
    error?: string | null;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitLabel?: string;
}

export default function FormComponent({title,description, display,fields,error,onSubmit,submitLabel = "Valider"}: FormComponentProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((s) => !s);

    const labels: Record<FieldType, string> = {
        email: "E-mail",
        password: "Mot de passe",
        "password-confirm": "Confirmez le mot de passe",
        text: "Texte",
        firstname: "Prénom",
        lastname: "Nom"
    };

    const defaultPlaceholders: Record<FieldType, string> = {
        email: "prenom.nom@etablissement.fr",
        password: "",
        "password-confirm": "",
        text: "",
        firstname: "",
        lastname: ""
    };

    return (
        <Paper component="form" onSubmit={onSubmit} sx={{ display, padding: 4, borderRadius: 5, maxWidth: 600 }}>
            <Stack spacing={2}>
                <Typography variant="h4" gutterBottom textAlign="justify">{title}</Typography>

                {description && (
                    <Typography variant="body1" gutterBottom textAlign="justify">{description}</Typography>
                )}

                {fields.map((f, index) => {
                    const label = labels[f.type];
                    const placeholder =
                        f.placeholder || defaultPlaceholders[f.type];

                    return (
                        <FormControl key={index} fullWidth variant="outlined">
                            <InputLabel>{label}</InputLabel>

                            <OutlinedInput
                                type={
                                    f.type === "password-confirm" ? "password" : f.type === "password" ? showPassword ? "text" : "password" : f.type === "email" ? "email" : "text"
                                }
                                value={f.value}
                                placeholder={placeholder}
                                label={label}
                                onChange={(e) => f.onChange(e.target.value)}
                                endAdornment={
                                    f.type === "password" && (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                                required={f.required}
                            />
                        </FormControl>
                    );
                })}

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: "20px", marginTop: 2, alignSelf: "center" }}
                >
                    {submitLabel}
                </Button>
            </Stack>
        </Paper>
    );
}
