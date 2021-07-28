import styled from '@emotion/styled';
// import { css } from '@emotion/css';
import IMAGE_CARD_TEMPLATE from '../shared/assets/card_template.png';

//
// ─── DERIVES ────────────────────────────────────────────────────────────────────
//
export const FloatingLabelProperties = styled.p`
    position: absolute;
    color: black;
    font-family: 'Press Start 2P', cursive;
`;
// ────────────────────────────────────────────────────────────────────────────────

export const PokeCardTemplate = styled.div`
    position: relative;
    width: 250px;
    height: 350px;
    background-image: url(${IMAGE_CARD_TEMPLATE});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    /* background-color: red; */
`;

export const PokeCardImage = styled.div<{ img_path: string }>`
    position: absolute;
    width: 84%;
    height: 43.2%;
    background-image: url(${(props) => props.img_path});
    /* background-color: red; */
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    top: 12%;
    left: 8%;
`;

export const PokeCardName = styled(FloatingLabelProperties)`
    left: 10%;
    top: 3%;
    font-size: 12px;
`;

export const PokeCardHPCPBar = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 84%;
    height: 8%;
    /* background-color: red; */
    top: 55%;
    left: 9%;
`;

export const PokeCardHPCPText = styled.p`
    color: black;
    font-family: 'Press Start 2P', cursive;
    font-size: 9px;
`;

export const PokeDescriptionBody = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    line-height: 1px;
    justify-content: center;
    width: 85%;
    height: 27%;
    top: 62%;
    left: 9%;
    /* background-color: red; */
`;

export const PokeCardDescriptionText = styled.p`
    color: black;
    font-family: 'Press Start 2P', cursive;
    font-size: 8px;
`;
