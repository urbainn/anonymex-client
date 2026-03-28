import { colors, TextField } from "@mui/material";

interface MyTextFieldProps {
    type: string;
    shrink?: boolean;
    sx?: object;
    label: string;
    value: string | number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    InputProps?: object;
}

function MyTextField(props: MyTextFieldProps) {

    return (
        <TextField {...props}
            type={props.type}
            InputLabelProps={props.shrink !== undefined ? { shrink: props.shrink } : undefined}
            sx={{

                bgcolor: colors.grey[100],
                borderRadius: 1,

                //  Transition appliquée à TOUTES les propriétés visuelles
                '& .MuiOutlinedInput-root': {
                    transition: "all 0.25s ease",

                    //  Border par défaut
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.grey[300],
                        borderWidth: "1px",
                        transition: "all 0.25s ease",
                    },

                    //  Hover
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.grey[400],
                        borderWidth: "1px", // garde fin
                    },

                    //  Focus
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.grey[600],
                        borderWidth: "1px", // <--- FIN AU FOCUS (sans effet épais)
                    },
                },

                // input text
                '& .MuiInputBase-input': {
                    transition: "all 0.2s ease",
                },


                "& input::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
                "& input::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
                "& input[type=number]": { MozAppearance: "textfield" },

            }}

        />);
}
export default MyTextField;