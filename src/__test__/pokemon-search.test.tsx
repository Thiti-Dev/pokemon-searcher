import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';
import {BrowserRouter} from 'react-router-dom'

const SAFE_TIMEOUT = 2 * 1000 // 2 seconds [could be more read @EXPLANATION]

const renderWithRouter = (ui:any, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: BrowserRouter})
}

/**
 * @NOTE No need to manually enter the text in the input to be testing because I already made that logic applied normally when recieved the query string
 * @BY THITI-DEV
 * @EXPLANATION We first then render the whole app into the scope then navigating to specific route and then wait for 2 seconds in order to wait for the response from graphql
 * @RISK note that 2 seconds might not be safe it could be any longer because if the deployed service has gone sleep [it may should more than 2 seconds]
 */

test('Searching the Bulbasaur by query string', async() => {
  const route = '/pokemon-search?search=Bulbasaur'
  await act(async() => {
    renderWithRouter(<App />, {route})
    await new Promise((r) => setTimeout(r, SAFE_TIMEOUT));
  })
  expect(screen.getByText(/Types:Grass,Poison/i)).toBeInTheDocument()
})

test('Searching the Charmander by query string', async() => {
  const route = '/pokemon-search?search=Charmander'
  await act(async() => {
    renderWithRouter(<App />, {route})
    await new Promise((r) => setTimeout(r, SAFE_TIMEOUT));
  })
  expect(screen.getByText(/Types:Fire/i)).toBeInTheDocument()
})

test('Searching the Squirtle by query string', async() => {
  const route = '/pokemon-search?search=Squirtle'
  await act(async() => {
    renderWithRouter(<App />, {route})
    await new Promise((r) => setTimeout(r, SAFE_TIMEOUT));
  })
  expect(screen.getByText(/Types:Water/i)).toBeInTheDocument()
})