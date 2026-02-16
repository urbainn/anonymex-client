import { colors, Stack, Typography } from "@mui/material";
import Selection from "./composantsGenerer/Selection";
import { useState } from "react";

interface MenuGenererMatExamProps {
    menuColor?: string;
}

function MenuGenererMatExam(props: MenuGenererMatExamProps) {

    const [afficherMenu, setAfficherMenu] = useState<boolean>(true);
    const [bordereaux, setBordereaux] = useState<boolean>(true);
    const [coupons, setCoupons] = useState<boolean>(false);
    const [emergement, setEmergement] = useState<boolean>(false);

    const handleClickBordereaux = () => {
        setBordereaux(true);
        setCoupons(false);
        setEmergement(false);
        setAfficherMenu(false);
    }

    const handleClickCoupons = () => {
        setBordereaux(false);
        setCoupons(true);
        setEmergement(false);
        setAfficherMenu(false);
    }

    const handleClickListes = () => {
        setBordereaux(false);
        setCoupons(false);
        setEmergement(true);
        setAfficherMenu(false);
    }


    return <>
    <Stack direction="column" alignItems="center" color={colors.grey[700]} height="100%" >
        <Typography variant="h6" marginBottom={5} fontWeight={500} > Choisissez un document à télécharger </Typography>
        <Stack display="flex" direction="row" spacing={2} alignItems="center" >
        <Stack spacing={2} >
            <Selection titre="Bordereaux" sousTitre="Telechargé le 19/02/2025" color={props.menuColor + "1F"} termine={true} handleClick={handleClickBordereaux} />
            <Selection titre="Coupons d'identification" sousTitre="Telechargé le 19/02/2025" color={props.menuColor + "1F"} termine={true} handleClick={handleClickCoupons} />
            <Selection titre="Listes d'émargement" sousTitre="Telechargé le 19/02/2025" color={props.menuColor + "1F"} termine={false} handleClick={handleClickListes} />
        </Stack>
        </Stack>        
    </Stack>
    </>;
}

export default MenuGenererMatExam;