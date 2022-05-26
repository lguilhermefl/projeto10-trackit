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
    const contextValue = { dadosRespostaLogin, setDadosRespostaLogin };

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