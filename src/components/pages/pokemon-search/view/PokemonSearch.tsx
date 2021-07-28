import { Container, TextField,Alert, Breadcrumbs,Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '../../../../shared/helpers/react-router-dom/useQuery';

import Autocomplete from '@material-ui/core/Autocomplete';
import LinearProgress from '@material-ui/core/LinearProgress';
import { PokemonContext, withPokemonProvider } from '../../../../shared/contexts/PokemonContext';

import { $HOOK_GetPokemonQuery } from '../../../../core/apollo/queries/wrappers/pokemon.wrapper';
import { useHistory } from 'react-router-dom';
import PokemonSearchResult from './PokemonSearch.Result';

import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

const PokemonSearch:React.FC<any> = () => {
  const query = useQuery()
  const history = useHistory()
  const $CONTEXT_pokemon = useContext(PokemonContext)
  const [focusedPokemon,setFocusedPokemon] = useState<string>("")

  //
  // ─── FLAG ───────────────────────────────────────────────────────────────────────
  //
  const [baseSearchQuery,SetBaseSearchQuery] = useState<string>(query.get('search') || "")
  // ────────────────────────────────────────────────────────────────────────────────


  //
  // ─── GRAPQL ─────────────────────────────────────────────────────────────────────
  //
  const { loading, error, data } = $HOOK_GetPokemonQuery(focusedPokemon); // using caching provided from apollo-client
  // ────────────────────────────────────────────────────────────────────────────────


  useEffect(() => {
    document.title = "PokemonSearch🔍"
    console.log('[Pokemon-search]: mounted')
    const search_query = query.get('search')
    if(search_query){
      console.log('found search query: ' + search_query)
      setFocusedPokemon(search_query)
      SetBaseSearchQuery(search_query)
      //TODO make a search operation on first mount
    }
    $CONTEXT_pokemon.loadAllPokemonNames()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //
  // ─── PREFAB ─────────────────────────────────────────────────────────────────────
  //
  // ────────────────────────────────────────────────────────────────────────────────

  function onSearchPokemon(name:string|null){
    if(!name) return
    history.push({pathname:'/pokemon-search',search: "?" + new URLSearchParams({search: name}).toString()})
    setFocusedPokemon(name)
    document.title = "PokemonSearch🔍 " + name
  }
  return (
      <Container fixed style={{ paddingTop:20 }}>
        <Breadcrumbs style={{ marginBottom:20 }} aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Landing page
          </Link>

          <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Pokemon search
        </Typography>
         
        </Breadcrumbs>
        <Autocomplete
          id="search-component"
          freeSolo
          options={$CONTEXT_pokemon.pokemon_name_lists ? $CONTEXT_pokemon.pokemon_name_lists : ["fetching all pokemon names . . . ."]}
          renderInput={(params) => <TextField {...params} label="search for the pokemon!!!" />}
          onChange={(_,value) => onSearchPokemon(value)}
          defaultValue={baseSearchQuery}
          value={focusedPokemon}
        />
        {focusedPokemon === "" ? null : 
          <>
            {loading ? <LinearProgress />: null}
            {error && loading===false ? <Alert severity="error">An error occurs, try again later</Alert> : null}
            <PokemonSearchResult view_pokemon={onSearchPokemon} pokemon={data?.pokemon} loading={loading}/>
          </>
        }
      </Container>
  )
}

export default withPokemonProvider(PokemonSearch)