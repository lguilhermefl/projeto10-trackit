import styled from 'styled-components';

export default function Header({ fotoPerfil }) {
    return (
        <Topo>
            <h1>TrackIt</h1>
            <img src={fotoPerfil} alt="Foto Perfil" />
        </Topo>
    );
}

const Topo = styled.div`
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 18px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    position: fixed;
    left: 0;
    top: 0;

    h1 {
        font-family: Playball, sans-serif;
        font-size: 39px;
        color: #FFFFFF;
        font-weight: 400;
    }

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 98.5px;
    }
`