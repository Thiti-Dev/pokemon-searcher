import styled from '@emotion/styled';
import { Container } from '@material-ui/core';
import IMAGE_Example from './assets/example.png';

export const MainContainer = styled(Container)`
    font-family: 'Press Start 2P', cursive;
    text-align: center;
`;

export const ExampleImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    /* background-color: red; */
    display: flex;
    justify-content: center;
`;

export const ExampleImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${IMAGE_Example});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;
