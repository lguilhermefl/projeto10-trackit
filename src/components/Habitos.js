import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import axios from 'axios';
import styled from 'styled-components';

import { API_URL } from './App';
import TelaApp from './shared/TelaApp';
import CriarHabito from './CriarHabito';

function DiaDaSemana({ index, dia, diasDoHabito }) {

    const selecionarDiaDeHabito = () => diasDoHabito.some(diaHabito => diaHabito === index);
    const diaDeHabito = selecionarDiaDeHabito();

    return <Dia diaDeHabito={diaDeHabito}>{ dia }</Dia>;
}

function Habito({ id, nome, diasDoHabito, listaDeHabitos, setListaDeHabitos, dadosRespostaLogin }) {

    const montarDiasDaSemana = () => {
        const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];

        return diasDaSemana.map((dia, index) =>
            <DiaDaSemana key={index} index={index} dia={dia} diasDoHabito={diasDoHabito}/>
        );
    };

    const novaListaDeHabitos = () => listaDeHabitos.filter(habito => habito.id !== id);

    const deletarHabito = () => {

        if(window.confirm(`Deseja realmente apagar o hábito: ${nome}?`)) {

            const URL = `${API_URL}/habits/${id}`;

            const config = {
                headers: {
                    "Authorization": `Bearer ${dadosRespostaLogin.token}`
                }
            };

            axios
                .delete(URL, config)
                .then(() => {
                    setListaDeHabitos(novaListaDeHabitos);
                })
                .catch(err => console.log(err));
        }
    }

    const diasDaSemana = montarDiasDaSemana();

    return (
        <ItemHabito>
            <DeletarHabito onClick={deletarHabito}>
                <ion-icon name="trash-outline"></ion-icon>
            </DeletarHabito>
            <span>{nome}</span>
            <DiasDaSemana>
                {diasDaSemana}
            </DiasDaSemana>
        </ItemHabito>
    );
}

function ListaDeHabitos({ listaDeHabitos, setListaDeHabitos, dadosRespostaLogin, renderizarLista }) {

    const montarListaDeHabitos = () => {

        if(listaDeHabitos.length !== 0) {

            return listaDeHabitos.map((habito, index) =>
                        <Habito key={index} id={habito.id} nome={habito.name}
                            diasDoHabito={habito.days} listaDeHabitos={listaDeHabitos}
                            setListaDeHabitos={setListaDeHabitos}
                            dadosRespostaLogin={dadosRespostaLogin}
                        />
            );
        } else if(listaDeHabitos.length === 0) {

            return (
                <SemHabitos>
                    <span>Você não tem nenhum hábito cadastrado ainda. 
                        Adicione um hábito para começar a trackear!</span>
                </SemHabitos>
            );
        }
    };

    const listarHabitos = renderizarLista ? montarListaDeHabitos() : null;
    return listarHabitos;
}


export default function Habitos() {

    const [listaDeHabitos, setListaDeHabitos] = useState([]);
    const [renderizarLista, setRenderizarLista] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { dadosRespostaLogin, verificarLocalStorage } = useContext(UserContext);

    const irPara = useNavigate();
    

    useEffect(() => {
        verificarLocalStorage(irPara, "/habitos");

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

        const URL = `${API_URL}/habits`;
        axios
            .get(URL, config)
            .then(({ data }) => {
                setListaDeHabitos(data);
                setRenderizarLista(true);
            })
            .catch(err => console.log(err));

    }, []);
    
    const toggleCriarHabito = () => setToggle(!toggle);

    return (
        <>
            <TelaApp>
                <Container>
                    <MeusHabitos>
                        <span>Meus Hábitos</span>
                        <AdicionarHabito disabled={toggle} onClick={toggleCriarHabito}>
                            <ion-icon name="add-sharp"></ion-icon>
                        </AdicionarHabito>
                    </MeusHabitos>
                    <CriarHabito toggle={toggle} toggleCriarHabito={toggleCriarHabito}
                        dadosRespostaLogin={dadosRespostaLogin} setListaDeHabitos={setListaDeHabitos}
                    />
                    <ListaDeHabitos listaDeHabitos={listaDeHabitos}
                        setListaDeHabitos={setListaDeHabitos}
                        dadosRespostaLogin={dadosRespostaLogin}
                        renderizarLista={renderizarLista}
                    />
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

const AdicionarHabito = styled.button`
    width: 40px;
    height: 35px;    
    display: flex;  
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #52B6FF;
    border-radius: 5px;
    border: none;

    ion-icon {
        --ionicon-stroke-width: 70px;
        font-size: 20px;
    }
`

const SemHabitos = styled.div`
    font-size: 18px;
    color: #666666;
    margin-top: 20px;
`

const ItemHabito = styled.div`
    position: relative;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #666666;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #FFFFFF;
`

const DiasDaSemana = styled.div`
    display: flex;
    gap: 4px;
`

const Dia = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid ${({diaDeHabito}) => diaDeHabito ? "#CFCFCF" : "#D5D5D5"};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    background: ${({diaDeHabito}) => diaDeHabito ? "#CFCFCF" : "#FFFFFF"};
    color: ${({diaDeHabito}) => diaDeHabito ? "#FFFFFF" : "#DBDBDB"};
`

const DeletarHabito = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;

        ion-icon {
            color: #666666;
            font-size: 15px;
        }
`