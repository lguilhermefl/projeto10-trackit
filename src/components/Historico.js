import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";

import TelaApp from './shared/TelaApp';

export default function Historico() {

    const { verificarLocalStorage } = useContext(UserContext);

    const irPara = useNavigate();

    useEffect(() => {
        verificarLocalStorage(irPara, "/historico");
    }, []);

    return (
        <TelaApp>

        </TelaApp>
    );
}