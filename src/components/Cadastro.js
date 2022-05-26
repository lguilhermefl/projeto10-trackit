import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import logo from "../assets/img/logo.png"
import { API_URL } from './App';
import { Container, Form } from './TelaInicial';

export default function Cadastro() {

    const [dadosCadastro, setDadosCadastro] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });
    const [carregando, setCarregando] = useState(false);

    const irPara = useNavigate();

    const montarFormularioCadastro = () => {
        return (
        <>
            <input
                disabled={carregando}
                required
                type="email"
                placeholder="email"
                value={dadosCadastro.email}
                onChange={e => setDadosCadastro({ ...dadosCadastro, email: e.target.value })}
            />
            <input
                disabled={carregando}
                required
                type="password"
                placeholder="senha"
                value={dadosCadastro.password}
                onChange={e => setDadosCadastro({ ...dadosCadastro, password: e.target.value })}
            />
            <input
                disabled={carregando}
                required
                type="text"
                placeholder="nome"
                value={dadosCadastro.name}
                onChange={e => setDadosCadastro({ ...dadosCadastro, name: e.target.value })}
            />
            <input
                disabled={carregando}
                required type="url"
                placeholder="foto"
                value={dadosCadastro.image}
                onChange={e => setDadosCadastro({ ...dadosCadastro, image: e.target.value })}
            />
            <button disabled={carregando}>
                {!carregando ? "Cadastrar" : <ThreeDots color="#FFFFFF"/>}
            </button>
        </>
        );
    };

    console.log(carregando);

    const cadastrar = e => {
        e.preventDefault();

        setCarregando(true);

        const URL = `${API_URL}/auth/sign-up`
        const dados = {...dadosCadastro};

        axios
            .post(URL, dados)
            .then(() => {
                irPara("/");
            })
            .catch(() => {
                alert("Houve um erro em seu cadastro, tente novamente por favor!");
                setCarregando(false);
            })
    };

    const formularioCadastro = montarFormularioCadastro();

    return (
        <Container>
            <img src={logo} alt="TrackIt logo" />
            <Form onSubmit={cadastrar}>{formularioCadastro}</Form>
            <Link to="/">
                <span>Já tem uma conta? Faça login!</span>
            </Link>
        </Container>
    );
}