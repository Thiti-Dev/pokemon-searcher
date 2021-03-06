import React, { useEffect } from 'react'
import { MainContainer,ExampleImageContainer,ExampleImage } from './Landing.styles'
import Button from '@material-ui/core/Button';
import PlayIcon from '@material-ui/icons/PlayArrow';
import {Link} from 'react-router-dom'

export default function Landing() {
  useEffect(() => {
    document.title = "ð¥pokemon-searcherð¥"
  },[])
  return (
    <MainContainer>
        <h1>Pokemon Search</h1>
        <h5>ð Features ð</h5>
        <h6>âï¸ Search pokemon byname</h6>
        <h6>âï¸ Search pokemon by query string</h6>
        <h6>âï¸ Display pokemon as a beautiful card</h6>
        <h6>âï¸ Be able to navigate deeply thru evolution of each pokemon</h6>
        <h6>âï¸ Be able to see the type of attacks and details such as attack-name, attack-type, damage . . .</h6>
        <h6>âï¸ Hinting the name of all existing pokemons on the input field, so you could be more flexible playing around</h6>

        <Link to="/pokemon-search">
        <Button variant="contained" endIcon={<PlayIcon />}>
          Continue to the application . . .
        </Button>
        </Link>

        <h5>ð» Created by ð»</h5>
        <h6>ð¥ Thiti Mahawannakit ð¥</h6>

        <ExampleImageContainer>
          <ExampleImage/>
        </ExampleImageContainer>
    </MainContainer>
  )
}
