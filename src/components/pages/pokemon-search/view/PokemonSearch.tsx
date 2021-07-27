import { Container, TextField,Alert } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '../../../../shared/helpers/react-router-dom/useQuery';

import Autocomplete from '@material-ui/core/Autocomplete';
import LinearProgress from '@material-ui/core/LinearProgress';
import { PokemonContext, withPokemonProvider } from '../../../../shared/contexts/PokemonContext';

import { $HOOK_GetPokemonQuery } from '../../../../core/apollo/queries/wrappers/pokemon.wrapper';
import { useHistory } from 'react-router-dom';

const PokemonSearch:React.FC<any> = () => {
  const query = useQuery()
  const history = useHistory()
  const $CONTEXT_pokemon = useContext(PokemonContext)
  const [focusedPokemon,setFocusedPokemon] = useState<string>("none")

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
  console.log(data)

  //
  // ─── PREFAB ─────────────────────────────────────────────────────────────────────
  //
  const rendered_pokemon = data?.pokemon ? data.pokemon.number : null 
  // ────────────────────────────────────────────────────────────────────────────────

  function onSearchPokemon(name:string|null){
    history.push({pathname:'/pokemon-search',search: "?" + new URLSearchParams({search: name!}).toString()})
    setFocusedPokemon(name!)
  }


  return (
      <Container fixed style={{ paddingTop:20 }}>
        <Autocomplete
          id="search-component"
          freeSolo
          options={$CONTEXT_pokemon.pokemon_name_lists ? $CONTEXT_pokemon.pokemon_name_lists : []}
          renderInput={(params) => <TextField {...params} label="search for the pokemon!!!" />}
          onChange={(_,value) => onSearchPokemon(value)}
          defaultValue={baseSearchQuery}
        />
        {loading ? <LinearProgress />: null}
        {error ? <Alert severity="error">This is an error alert — check it out!</Alert> : null}
        {rendered_pokemon}
      </Container>
  )
}

export default withPokemonProvider(PokemonSearch)