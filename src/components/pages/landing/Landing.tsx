import React from 'react'
import { MainContainer,ExampleImageContainer,ExampleImage } from './Landing.styles'
import Button from '@material-ui/core/Button';
import PlayIcon from '@material-ui/icons/PlayArrow';
import {Link} from 'react-router-dom'

export default function Landing() {
  return (
    <MainContainer>
        <h1>Pokemon Search</h1>
        <h5>🌟 Features 🌟</h5>
        <h6>✔️ Search pokemon byname</h6>
        <h6>✔️ Search pokemon by query string</h6>
        <h6>✔️ Display pokemon as a beautiful card</h6>
        <h6>✔️ Be able to navigate deeply thru evolution of each pokemon</h6>
        <h6>✔️ Be able to see the type of attacks and details such as attack-name, attack-type, damage . . .</h6>
        <h6>✔️ Hinting the name of all existing pokemons on the input field, so you could be more flexible playing around</h6>

        <Link to="/pokemon-search">
        <Button variant="contained" endIcon={<PlayIcon />}>
          Continue to the application . . .
        </Button>
        </Link>

        <h5>💻 Created by 💻</h5>
        <h6>🔥 Thiti Mahawannakit 🔥</h6>

        <ExampleImageContainer>
          <ExampleImage/>
        </ExampleImageContainer>
    </MainContainer>
  )
}
