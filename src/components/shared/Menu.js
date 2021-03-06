import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react';
import UserContext from "../contexts/UserContext";
import axios from 'axios';

import { API_URL } from '../App';

export default function Menu() {

    const {
        dadosRespostaLogin,
        listaDeHabitosDoDia,
        setListaDeHabitosDoDia,
        setPorcentagemHabitosFeitosDoDia
    } = useContext(UserContext);

    const estiloBarraProgresso = buildStyles({
        backgroundColor: "#52B6FF",
        textColor: "#fff",
        pathColor: "#fff",
        trailColor: "transparent"
    });

    const calcularPorcentagemDeHabitosFeitos = () => {
        const totalDeHabitos = listaDeHabitosDoDia.length;
        const totalDeHabitosFeitos = listaDeHabitosDoDia.filter(habito => habito.done).length;
        const porcentagem = Math.round((totalDeHabitosFeitos/totalDeHabitos) * 100);
        if(listaDeHabitosDoDia.length === 0) {
            return 0;
        } else {
            return porcentagem;
        }
    };
    
    const porcentagemHabitosFeitos = calcularPorcentagemDeHabitosFeitos();

    useEffect(() => {
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

        const URL = `${API_URL}/habits/today`;

        axios
            .get(URL, config)
            .then(({ data }) => {
                setListaDeHabitosDoDia(data);
            });
    },[]);

    useEffect(() => {
        setPorcentagemHabitosFeitosDoDia(porcentagemHabitosFeitos);
    }, [listaDeHabitosDoDia]);

    return (
        <BarraMenu>
            <Link to="/habitos">
                <span>H??bitos</span>
            </Link>
            <Link to="/hoje">
                <Progresso>
                    <CircularProgressbar
                        value={porcentagemHabitosFeitos}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={estiloBarraProgresso}
                    />
                </Progresso>
            </Link>
            <Link to="/historico">
                <span>Hist??rico</span>
            </Link>
        </BarraMenu>
    );
}

const BarraMenu = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #FFFFFF;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;

        span {
            color: #52B6FF;
            font-size: 18px;
        }
`

const Progresso = styled.div`
    width: 90px;
    height: 90px;
    margin-bottom: 40px;
`