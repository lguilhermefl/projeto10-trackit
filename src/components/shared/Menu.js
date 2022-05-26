import styled from 'styled-components';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'

export default function Menu() {

    const estiloBarraProgresso = buildStyles({
        backgroundColor: "#52B6FF",
        textColor: "#fff",
        pathColor: "#fff",
        trailColor: "transparent"
    });

    const percentage = 66;

    return (
        <BarraMenu>
            <Link to="/habitos">
                <span>Hábitos</span>
            </Link>
            <Link to="/hoje">
                <Progresso>
                    <CircularProgressbar
                        value={percentage}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={estiloBarraProgresso}
                    />
                </Progresso>
            </Link>
            <Link to="/historico">
                <span>Histórico</span>
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
        }
`

const Progresso = styled.div`
    width: 90px;
    height: 90px;
    margin-bottom: 40px;
`