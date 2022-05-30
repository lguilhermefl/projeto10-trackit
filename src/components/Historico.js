import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from "./contexts/UserContext";
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import TelaApp from './shared/TelaApp';
import { API_URL } from './App';

const dayjs = require('dayjs');

export default function Historico() {

    const [historicoHabitos, setHistoricoHabitos] = useState([]);
    const { verificarLocalStorage, dadosRespostaLogin } = useContext(UserContext);

    const irPara = useNavigate();

    useEffect(() => {
        verificarLocalStorage(irPara, "/historico");

        const URL = `${API_URL}/habits/history/daily`;

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
                setHistoricoHabitos(data);
            });
    }, []);

    const dia = (locale, date) => 
        <Dia statusHabitos={checarHabitos(date)}>
            {dayjs(date).format("DD")}
        </Dia>;

    const checarHabitos = date => {
        const data = dayjs(date).format("DD/MM/YYYY");
        const habitosDoDia = historicoHabitos?.filter(historico => historico.day === data);

        if (habitosDoDia.length !== 0) {
            const totalHabitosFeitos = habitosDoDia[0].habits.filter(habito => habito.done).length;
            const totalHabitosDoDia = habitosDoDia[0].habits.length;

            if (totalHabitosDoDia === totalHabitosFeitos) {
                return "todos feitos";
            }
            return "parcialmente feitos"
        }
        return "sem hábitos";

    };

    return (
        <TelaApp>
            <Container>
                <Titulo>Histórico</Titulo>
                <Calendar calendarType="US" formatDay={dia} />
            </Container>
        </TelaApp>
    );
}

const corDia = statusHabitos => {
    if(statusHabitos === "todos feitos") {
        return "#8CC654";
    } else if(statusHabitos === "parcialmente feitos") {
        return "#EA5766";
    } else if(statusHabitos === "sem hábitos") {
        return "none";
    }
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

        .react-calendar {
            border: none;
            border-radius: 10px;
            margin-top: 20px;
        }

        .react-calendar__month-view__days button {
            padding: 0;
            display: flex;
            justify-content: center;
        }
`

const Titulo = styled.span`
    color: #126BA5;
    font-size: 23px;
    margin-top: 5px;
`

const Dia = styled.div`
    border-radius: 50px;
    background-color: ${({statusHabitos}) => corDia(statusHabitos)};
    line-height: 36px;
    width: 36px;
`