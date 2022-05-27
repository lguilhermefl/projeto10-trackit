import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from "./contexts/UserContext";
import styled from 'styled-components';

import { API_URL } from './App';
import TelaApp from './shared/TelaApp';

const dayjs = require('dayjs');
require('dayjs/locale/pt-br');
const updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale);

dayjs.updateLocale('pt-br', {
    weekdays : [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]
  });

const now = dayjs();

export default function Hoje() {

    const [habitosDeHoje, setHabitosDeHoje] = useState([]);

    const { dadosRespostaLogin, verificarLocalStorage } = useContext(UserContext);

    const irPara = useNavigate();

    useEffect(() => {
        verificarLocalStorage(irPara, "/hoje");

        const URL = `${API_URL}/habits/today`;

        let config;

        if(dadosRespostaLogin.length) {
            config = {
                headers: {
                    "Authorization": `Bearer ${dadosRespostaLogin.token}`
                }
            };
        } else {
            const dados = JSON.parse(localStorage.getItem("dadosUsuario"));

            config = {
                headers: {
                    "Authorization": `Bearer ${dados.token}`
                }
            };
        }

        axios
            .get(URL, config)
            .then(({ data }) => {
                setHabitosDeHoje(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <TelaApp>
            <Container>
                <Data>{now.locale('pt-br').format('dddd, DD/MM')}</Data>
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

const Data = styled.div`
    color: #126BA5;
    font-size: 23px;
`