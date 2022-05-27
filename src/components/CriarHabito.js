import { useState } from 'react';
import { ThreeDots } from "react-loader-spinner";
import axios from 'axios';
import styled from 'styled-components';

import { API_URL } from './App';

function DiaDaSemana({ id, dia, novoHabito, days, setNovoHabito, carregando }) {

    const selecionado = novoHabito.days.some(dia => dia === id);

    const selecionarDia = () => {
        if(!selecionado) {
            let habito = {...novoHabito};
            habito.days = [...days, id];
            setNovoHabito(habito);
        } else if(selecionado) {
            const diaRemovido = novoHabito.days.filter(dia => dia !== id);
            setNovoHabito({...novoHabito, days: diaRemovido});
        }
    };

    return <Dia disabled={carregando} type="button" onClick={selecionarDia}
        selecionado={selecionado}>{dia}</Dia>;
}

export default function CriarHabito({ toggle, toggleCriarHabito, dadosRespostaLogin,
    setListaDeHabitos }) {

    const [novoHabito, setNovoHabito] = useState({
        name: "",
        days: []
    });
    const [carregando, setCarregando] = useState(false);
    
    const montarDiasDaSemana = () => {
        const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

        return diasDaSemana.map((dia, index) =>
            <DiaDaSemana key={index} id={index} dia={dia} novoHabito={novoHabito}
            days={novoHabito.days} setNovoHabito={setNovoHabito} carregando={carregando}
            />
        );
    };

    const montarCriarHabito = () => {
        return (
            <>
                <NovoHabito>
                    <Form onSubmit={enviarNovoHabito}>
                        <InfoHabito>
                            <input
                                disabled={carregando}
                                type="text"
                                placeholder="nome do hábito"
                                value={novoHabito.name}
                                onChange={e => setNovoHabito({...novoHabito, name: e.target.value})}
                            />
                            <DiasSemana>
                                {diasDaSemana}
                            </DiasSemana>
                        </InfoHabito>
                        <Botoes>
                            <Cancelar disabled={carregando} onClick={toggleCriarHabito}>
                                Cancelar
                            </Cancelar>
                            <Salvar disabled={carregando} type="submit">
                                {!carregando ? "Salvar" : <ThreeDots color="#FFFFFF"/>}
                            </Salvar>
                        </Botoes>
                    </Form>
                </NovoHabito>
            </>
        );
    }

    const enviarNovoHabito = e => {
        e.preventDefault();
        setCarregando(true);

        if(novoHabito.name === "") {
            setCarregando(false);
            return alert("Preencha o campo de nome do hábito por favor!");
        } else if(novoHabito.days.length === 0) {
            setCarregando(false);
           return alert("Você deve marcar ao menos um dia da semana para um novo hábito!");
        }

        const URL = `${API_URL}/habits`;

        const config = {
            headers: {
                "Authorization": `Bearer ${dadosRespostaLogin.token}`
            }
        };

        const body = {...novoHabito};

        axios
            .post(URL, body, config)
            .then(({ data }) => {

                setNovoHabito({
                    name: "",
                    days: []
                });
                toggleCriarHabito();
                setListaDeHabitos(lista => [...lista, data]);
                setCarregando(false);
            })
            .catch(err => {
                setCarregando(false);
                alert("Nosso servidor está com problemas, tente novamente em alguns instantes!");
            });
    };

    const diasDaSemana = montarDiasDaSemana();
    const criarHabito = toggle ? montarCriarHabito() : null;

    return (
        <>
            {criarHabito}
        </>
    );
}

const NovoHabito = styled.div`
    width: 100%;
    height: 180px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 18px;
`

const Form = styled.form`
    height: 100%;
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
            background: #F2F2F2;
            color: #B3B3B3;
        }
`

const DiasSemana = styled.div`
    display: flex;
    gap: 4px;
`

const Dia = styled.button`
    width: 30px;
    height: 30px;
    border: 1px solid ${({selecionado}) => selecionado ? "#CFCFCF" : "#D5D5D5"};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background: ${({selecionado}) => selecionado ? "#CFCFCF" : "#FFFFFF"};
    color: ${({selecionado}) => selecionado ? "#FFFFFF" : "#DBDBDB"};
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

        button:disabled {
            opacity: 0.7;
        }
`

const Cancelar = styled.button`
    font-size: 16px;
    width: 85px;
    height: 100%;
    color: #52B6FF;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`

const Salvar = styled.button`
    font-size: 16px;
    width: 85px;
    height: 100%;
    color: #FFFFFF;
    background: #52B6FF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`