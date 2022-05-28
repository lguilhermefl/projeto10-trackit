import { useContext } from 'react';
import UserContext from "../contexts/UserContext";

import Header from './Header';
import Menu from './Menu';

export default function TelaApp({ children }) {
    const { dadosRespostaLogin, porcentagemHabitosFeitosDoDia } = useContext(UserContext);

    return (
        <>
            <Header fotoPerfil={dadosRespostaLogin.fotoPerfil} />
                {children}
            <Menu porcentagemHabitosFeitosDoDia={porcentagemHabitosFeitosDoDia} />
        </>
    );
}