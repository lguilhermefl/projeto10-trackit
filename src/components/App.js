import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./shared/globalStyles";
import UserContext from "./contexts/UserContext";

import TelaInicial from "./TelaInicial";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import Hoje from "./Hoje";
import Historico from "./Historico"


export default function App() {

    const [dadosRespostaLogin, setDadosRespostaLogin] = useState({});
    const [porcentagemHabitosFeitosDoDia, setPorcentagemHabitosFeitosDoDia] = useState(0);

    const verificarLocalStorage = (redirecionar, local) => {
        const dadosSerializados = localStorage.getItem("dadosUsuario");

        if(dadosSerializados) {
            const dados = JSON.parse(dadosSerializados);
            setDadosRespostaLogin(dados);
            redirecionar(local);
        } else {
            redirecionar("/");
        }
    }

    const contextValue = {
        dadosRespostaLogin,
        setDadosRespostaLogin,
        verificarLocalStorage,
        porcentagemHabitosFeitosDoDia,
        setPorcentagemHabitosFeitosDoDia
    };

    return (
        <BrowserRouter>
            <GlobalStyle />
            <UserContext.Provider value={contextValue}>
                <Routes>
                    <Route path="/" element={<TelaInicial />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje" element={<Hoje />} />
                    <Route path="/historico" element={<Historico />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";