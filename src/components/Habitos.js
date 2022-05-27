import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import axios from 'axios';
import styled from 'styled-components';

import { API_URL } from './App';
import TelaApp from './shared/TelaApp';

function CriarHabito() {

    const montarDiasDaSemana = () => {
        const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

        return diasDaSemana.map((dia, index) =>
            <Dia key={index}>
                <span>{dia}</span>
            </Dia>
        );
    };

    const diasDaSemana = montarDiasDaSemana();

    const montarCriarHabito = () => {
        return (
            <>
                <Habito>
                    <InfoHabito>
                        <input
                            placeholder="nome do hábito"
                        />
                        <DiasSemana>
                            {diasDaSemana}
                        </DiasSemana>
                    </InfoHabito>
                    <Botoes>
                        <span>Cancelar</span>
                        <Salvar>
                            <span>Salvar</span>
                        </Salvar>
                    </Botoes>
                </Habito>
            </>
        );
    }

    const criarHabito = montarCriarHabito();

    return (
        <>
            {criarHabito}
        </>
    );
}

export default function Habitos() {

    const [listaDeHabitos, setListaDeHabitos] = useState([]);
    const { verificarLocalStorage } = useContext(UserContext);

    const irPara = useNavigate();

    /*useEffect(() => {
        const URL = `${API_URL}/habits`;
        axios
            .get()

    }, []);*/

    useEffect(() => {
        verificarLocalStorage(irPara, "/habitos");
    }, []);

    return (
        <>
            <TelaApp>
                <Container>
                    <MeusHabitos>
                        <span>Meus Hábitos</span>
                        <AdicionarHabito>
                            <ion-icon name="add-sharp"></ion-icon>
                        </AdicionarHabito>
                    </MeusHabitos>
                    <CriarHabito />
                </Container>
            </TelaApp>
        </>
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

const MeusHabitos = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #126BA5;
    font-size: 23px;
    margin-bottom: 10px;
`

const AdicionarHabito = styled.div`
    width: 40px;
    height: 35px;    
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #52B6FF;
    border-radius: 5px;

    ion-icon {
        --ionicon-stroke-width: 70px;
        font-size: 20px;
    }
`

const Habito = styled.div`
    width: 100%;
    height: 180px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #DBDBDB;
`

const InfoHabito = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

        input {
            width: 100%;
            height: 45px;
            box-sizing: border-box;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            padding: 0 10px;
            color: #666666;
            font-size: 20px;
        }

        input:focus {
            outline: 1px solid #52B6FF;
        }

        input::placeholder {
            color: #DBDBDB;
        }

        input:disabled {
            background: #D4D4D4;
            color: #AFAFAF;
        }
`

const DiasSemana = styled.div`
    display: flex;
    gap: 4px;
`

const Dia = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Botoes = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 25px;
    color: #52B6FF;
    font-size: 16px;
`

const Salvar = styled.div`
    width: 85px;
    height: 100%;
    color: #FFFFFF;
    background: #52B6FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`