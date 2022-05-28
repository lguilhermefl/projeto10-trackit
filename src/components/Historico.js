import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import styled from 'styled-components';

import TelaApp from './shared/TelaApp';

export default function Historico() {

    const { verificarLocalStorage } = useContext(UserContext);

    const irPara = useNavigate();

    useEffect(() => {
        verificarLocalStorage(irPara, "/historico");
    }, []);

    return (
        <TelaApp>
            <Container>
                <Titulo>Histórico</Titulo>
                <MensagemEmBreve>
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </MensagemEmBreve>
            </Container>
        </TelaApp>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 100px 0;
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Titulo = styled.span`
    color: #126BA5;
    font-size: 23px;
    margin-top: 5px;
`

const MensagemEmBreve = styled.span`
    font-size: 18px;
    color: #666666;
    margin-top: 20px;
`