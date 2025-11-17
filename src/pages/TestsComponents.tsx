import React from "react";
import SearchBar from "../components/SearchBar";
import { Button, Stack } from "@mui/material";

export default function TestsComponents() {

    const [searchTerm, setSearchTerm] = React.useState('');
    const [sessionName, setSessionName] = React.useState('Session 1 2023');
    const [backToSessions, setBackToSessions] = React.useState(true);


    return (
        <>
            <Stack alignItems="center" p={5}>
                <SearchBar  setNewSearchTerm={setSearchTerm} sessionName={sessionName} backToSessions={backToSessions} setBackToSessions={setBackToSessions} />
            </Stack>
            <div>
                Search Term: {searchTerm}
            </div>
            
       
        </>
    );
}