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

export interface Title {
    text: string;
    variant?: "h3" |"h4" | "h5" | "h6";
    align?: "left" | "center" | "right" | "justify";
    style?: React.CSSProperties;
}

export interface Button {
    label: string;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    display?: React.CSSProperties["display"];
}

interface FormComponentProps {
    title: Title;
    description?: string;
    displayForm?: React.CSSProperties["display"];
    fields: Field[];
    error?: string | null;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitButton: Button;
    children?: React.ReactNode;
}

export default function FormComponent({title,description, displayForm ,fields,error,onSubmit,submitButton, children}: FormComponentProps) {
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

    return (
        <Paper component="form" onSubmit={onSubmit} sx={{ display: displayForm, padding: 4, borderRadius: 5, maxWidth: 600 }}>
            <Stack spacing={3}>
                <Typography variant={title.variant || "h4"} gutterBottom textAlign={title.align || "justify"} style={title.style}>{title.text}</Typography>

                {description && (
                    <Typography variant="body1" gutterBottom textAlign="justify">{description}</Typography>
                )}

                {fields.map((f, index) => {
                    const label = labels[f.type];
                    const placeholder = f.placeholder || "";

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
                    sx={{ display: submitButton.display || 'flex', borderRadius: "20px", marginTop: 2, alignSelf: "center" }}
                    endIcon={submitButton.endIcon}
                    disabled={submitButton.disabled}
                    
                >
                    {submitButton.label}
                </Button>
                {children}
            </Stack>
        </Paper>
    );
}
