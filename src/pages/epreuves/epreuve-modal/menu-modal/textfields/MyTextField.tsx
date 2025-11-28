import { colors, TextField } from "@mui/material";


function MyTextField(props: any) {

    return (
        <TextField {...props}
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
            }} />);
}
export default MyTextField;