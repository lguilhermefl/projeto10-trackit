import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from "./contexts/UserContext";
import styled from 'styled-components';

import { API_URL } from './App';
import TelaApp from './shared/TelaApp';
import check from '../assets/img/check.svg'

const dayjs = require('dayjs');
require('dayjs/locale/pt-br');
const updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(updateLocale);

dayjs.updateLocale('pt-br', {
    weekdays : [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]
  });

function HabitoDeHoje({ id, nome, feito, sequenciaAtual, maiorSequencia, token, setHabitosDeHoje }) {

    const [carregando, setCarregando] = useState(false);

    const atualizarHabitosDeHoje = () => {
        const URL = `${API_URL}/habits/today`;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        axios
            .get(URL, config)
            .then(({ data }) => {
                setHabitosDeHoje(data);
            });
    } 


    const toggleHabitoDeHoje = () => {
        if(!feito) {
            setCarregando(true);
            const URL = `${API_URL}/habits/${id}/check`;

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            axios
                .post(URL, {}, config)
                .then(() => {
                    atualizarHabitosDeHoje();
                    setCarregando(false);
                })
                .catch(setCarregando(false));

        } else if(feito) {
            setCarregando(true);
            const URL = `${API_URL}/habits/${id}/uncheck`;

            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };

            axios
                .post(URL, {}, config)
                .then(() => {
                    atualizarHabitosDeHoje();
                    setCarregando(false);
                })
                .catch(setCarregando(false));
        }
    }

    return (
        <HabitoDoDia>
            <InfoHabito>
                <NomeHabito>{nome}</NomeHabito>
                <InfoSequenciaHabito>
                    <div>
                        <span>Sequência atual: </span>
                        <Atual feito={feito}>{sequenciaAtual} dias</Atual>
                    </div>
                    <div>
                        <span>Seu recorde: </span>
                        <Maior sequenciaAtual={sequenciaAtual} maiorSequencia={maiorSequencia}>
                            {maiorSequencia} dias
                        </Maior>
                    </div>
                    
                </InfoSequenciaHabito>
            </InfoHabito>
            <BotaoCheck disabled={carregando} feito={feito} onClick={toggleHabitoDeHoje}>
                <img src={check} alt="Check Hábito" />
            </BotaoCheck>
        </HabitoDoDia>
    );
}

function ListaHabitosDeHoje({ habitosDeHoje, setHabitosDeHoje, token,
    setPorcentagemHabitosFeitosDoDia }) {
    
    const calcularPorcentagemDeHabitosFeitos = () => {
        const totalDeHabitos = habitosDeHoje.length;
        const totalDeHabitosFeitos = habitosDeHoje.filter(habito => habito.done).length;
        const porcentagem = Math.round((totalDeHabitosFeitos/totalDeHabitos) * 100);
        if(habitosDeHoje.length === 0) {
            return 0;
        } else {
            return porcentagem;
        }
    };
    
    const porcentagemHabitosFeitos = calcularPorcentagemDeHabitosFeitos();
    
    useEffect(() => {
        setPorcentagemHabitosFeitosDoDia(porcentagemHabitosFeitos);
    }, [porcentagemHabitosFeitos]);

    const montarListaHabitosDeHoje = () => {

        return habitosDeHoje.map(habito => 
            <HabitoDeHoje key={habito.id} id={habito.id} nome={habito.name}
                feito={habito.done} sequenciaAtual={habito.currentSequence}
                maiorSequencia={habito.highestSequence} token={token}
                setHabitosDeHoje={setHabitosDeHoje}
            />
        );
    }

    const listaHabitosDeHoje = montarListaHabitosDeHoje();
    

    return listaHabitosDeHoje;
}

export default function Hoje() {

    const [habitosDeHoje, setHabitosDeHoje] = useState([]);
    const { 
        dadosRespostaLogin,
        verificarLocalStorage,
        porcentagemHabitosFeitosDoDia,
        setPorcentagemHabitosFeitosDoDia 
    } = useContext(UserContext);

    const irPara = useNavigate();
    const now = dayjs();
    const dataHoje = now.locale('pt-br').format('dddd, DD/MM');

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
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const definirMensagemHabitosConcluidos = () => {
        if(porcentagemHabitosFeitosDoDia === 0) {
            return "Nenhum hábito concluído ainda";
        } else {
            return `${porcentagemHabitosFeitosDoDia}% dos hábitos concluídos`;
        }    
    };
    const mensagemHabitosConcluidos = definirMensagemHabitosConcluidos();

    return (
        <TelaApp>
            <Container>
                <Data>{dataHoje}</Data>
                <HabitosConcluidos porcentagemHabitosFeitosDoDia={porcentagemHabitosFeitosDoDia}>
                    {mensagemHabitosConcluidos}
                </HabitosConcluidos>
                <ListaHabitosDeHoje habitosDeHoje={habitosDeHoje} token={dadosRespostaLogin.token}
                    setHabitosDeHoje={setHabitosDeHoje}
                    setPorcentagemHabitosFeitosDoDia={setPorcentagemHabitosFeitosDoDia}
                />
            </Container>
        </TelaApp>
    );
}

const corMensagemHabitosConcluidos = porcentagemHabitosFeitosDoDia => {
    if(porcentagemHabitosFeitosDoDia === 0) {
        return "#BABABA";
    } else {
        return "#8FC549"
    }
};

const corMaiorSequencia = (sequenciaAtual, maiorSequencia) => {
    if(sequenciaAtual === maiorSequencia && sequenciaAtual !== 0) {
        return "#8FC549";
    } else {
        return "#666666";
    }
};

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
    margin-top: 5px;
`

const HabitosConcluidos = styled.span`
    font-size: 18px;
    color: ${({porcentagemHabitosFeitosDoDia}) => 
        corMensagemHabitosConcluidos(porcentagemHabitosFeitosDoDia)};
    margin-bottom: 20px;
`

const HabitoDoDia = styled.div`
    width: 100%;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`

const InfoHabito = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #666666;
`

const BotaoCheck = styled.button`
    border: none;
    width: 64px;
    height: 64px;
    border-radius: 5px;
    background: ${({ feito }) => feito ? "#8FC549" : "#EBEBEB"};
`

const NomeHabito = styled.span`
    font-size: 20px;
`

const InfoSequenciaHabito = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 13px;
`

const Atual = styled.span`
    color: ${({feito}) => feito ? "#8FC549" : "#666666"};
`

const Maior = styled.span`
    color: ${({sequenciaAtual, maiorSequencia}) => corMaiorSequencia(sequenciaAtual, maiorSequencia)};
`