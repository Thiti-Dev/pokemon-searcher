import React from 'react';
import { act, render, screen,waitFor,cleanup  } from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from 'react-router-dom'

const renderWithRouter = (ui:any, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

/**
 * @NOTE No need to manually enter the text in the input to be testing because I already made that logic applied normally when recieved the query string
 * @BY THITI-DEV
 * @EXPLANATION We first then render the whole app into the scope then navigating to specific route and then wait for the graphql return the result by using waitFor
 * @RISK If the hosted-server(graphql) just wake up from the sleep state [the test process might take longer]
 */

//afterEach(cleanup)
beforeEach(cleanup)

describe('Pokemon searcher', () => {
  it('Search for Bulbasaur and get correct datas', async() => {
      const route = '/pokemon-search?search=Bulbasaur'
      await act(async () => {
        renderWithRouter(<App />, {route})
        await waitFor(() => screen.getByTestId("pokemon-type"))
      })
      expect(screen.getByText(/Types:Grass,Poison/i)).toBeInTheDocument()
  })
  it('Search for Charmander and get correct datas', async() => {
    const route = '/pokemon-search?search=Charmander'
    await act(async () => {
      renderWithRouter(<App />, {route})
      await waitFor(() => screen.getByTestId("pokemon-type"))
    })
    expect(screen.getByText(/Types:Fire/i)).toBeInTheDocument()
  })
  it('Search for Squirtle and get correct datas', async() => {
    const route = '/pokemon-search?search=Squirtle'
    await act(async () => {
      renderWithRouter(<App />, {route})
      await waitFor(() => screen.getByTestId("pokemon-type"))
    })
    expect(screen.getByText(/Types:Water/i)).toBeInTheDocument()
  })
})