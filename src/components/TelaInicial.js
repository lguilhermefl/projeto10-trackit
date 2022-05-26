import axios from 'axios';
import { useState, useContext } from 'react';
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UserContext from "./contexts/UserContext";

import logo from "../assets/img/logo.png"
import { API_URL } from './App';

export default function TelaInicial() {
    const [dadosLogin, setDadosLogin] = useState({
        email: "",
        password: ""
    }); 
    const [carregando, setCarregando] = useState(false);
    const { setDadosRespostaLogin } = useContext(UserContext);

    const irPara = useNavigate();

    const montarFormularioLogin = () => {
        return (
        <>
            <input
                disabled={carregando}
                required
                type="email"
                placeholder="email"
                value={dadosLogin.email}
                onChange={e => setDadosLogin({ ...dadosLogin, email: e.target.value })}
            />
            <input
                disabled={carregando}
                required
                type="password"
                placeholder="senha"
                value={dadosLogin.password}
                onChange={e => setDadosLogin({ ...dadosLogin, password: e.target.value })}
            />
            <button disabled={carregando}>
                {!carregando ? "Entrar" : <ThreeDots color="#FFFFFF"/>}
            </button>
        </>
        );
    };

    const entrar = e => {
        e.preventDefault();

        setCarregando(true);

        const URL = `${API_URL}/auth/login`
        const dados = {...dadosLogin};

        axios
            .post(URL, dados)
            .then(({ data }) => {
                irPara("/hoje");
                setDadosRespostaLogin(data);
            })
            .catch(() => {
                alert("Houve um erro em seu Login, tente novamente por favor!");
                setCarregando(false);
            })
    };

    const formularioLogin = montarFormularioLogin();

    return (
        <Container>
            <img src={logo} alt="TrackIt logo" />
            <Form onSubmit={entrar}>{formularioLogin}</Form>
            <Link to="/cadastro">
                <span>Não tem uma conta? Cadastre-se!</span>
            </Link>
        </Container>
    );
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;

    img {
        margin-top: 70px;
    }

    span {
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
        font-size: 14px;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;

        input {
            width: 303px;
            height: 45px;
            box-sizing: border-box;
            font-size: 20px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            padding: 0 10px;
        }

        input:focus {
            outline: 1px solid #52B6FF;
        }

        input::placeholder {
            color: #D4D4D4;
        }

        input:disabled {
            background: #D4D4D4;
            color: #AFAFAF;
        }

        button {
            background: #52B6FF;
            color: #FFFFFF;
            width: 303px;
            height: 45px;
            font-size: 21px;
            border-radius: 5px;
            border: none;
            margin-bottom: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        button:disabled {
            opacity: 0.7;
        }
`