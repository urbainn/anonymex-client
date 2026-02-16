import { Typography, Stack, colors, Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BoutonStandard from "../../components/BoutonStantard";
import DownloadIcon from '@mui/icons-material/Download';

interface PDFPageProps {
    documentSelectionne: 1 | 2 | 3;
    setPDFpage: (value: boolean) => void;
    color: string;
}

const Documents: Record<number, string> = {
    1: "Bordereaux",
    2: "Coupons d'identification",
    3: "Listes d'émargement"
};


export default function PDFPage(props: PDFPageProps) {


    return (
        <>



            <Stack direction="row" justifyContent="space-between" spacing={2} >
                <Stack width={"70%"} bgcolor={colors.grey[200]} height={"100%"}>
                    <iframe
                        id="inlineFrameExample"
                        title="Exemple de cadre intégré"
                        width="100%"
                        height="470"
                        src="https://us1.pdfgeneratorapi.com/api/v3/templates/686726/output?key=ab0801834ab51edb6e8fee01dd4adc28f0dcd8a03ea2f2f17eeeb475b5c51ec8&workspace=demo.example@actualreports.com&signature=3123e0212c6e3d44b64738a77b0daf0781a1271439cab6301755cb4773a6446f&data=https://pdfgeneratorapi-web-assets.s3.amazonaws.com/data/bill_of_lading_data.json&format=pdf&output=I">
                    </iframe>
                </Stack>
                <Stack width={"30%"} justifyContent={"space-between"}>
                    <Stack>
                        <Typography variant="h5" fontWeight={500} mb={4}> {Documents[props.documentSelectionne]} </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <BoutonStandard color={props.color} onClick={() => props.setPDFpage(false)} icone={<DownloadIcon />} texte="Télécharger" />
                        <BoutonStandard color={colors.grey[500]} onClick={() => props.setPDFpage(false)} icone={<ChevronLeftIcon />} texte="Retour au menu" />
                    </Stack>
                </Stack>
            </Stack >
        </>

    );
}