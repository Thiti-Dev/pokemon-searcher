import { gql } from '@apollo/client';
import React, { Component, ComponentClass, StatelessComponent } from 'react'
import { APOLLO_query } from '../../core/apollo/common';
type ComponentConstructor<P> = ComponentClass<P> | StatelessComponent<P>;

interface IPokemonContextFunction{
    loadAllPokemonNames: () => Promise<void>
}

interface IPokemonContext extends IPokemonContextFunction{
    pokemon_name_lists: string[] | null, // null is the default value -> haven't yet fetched

}

const PokemonContext = React.createContext<IPokemonContext>({
    pokemon_name_lists: null,
    loadAllPokemonNames: async function(){
        await (async()=>{
            console.log("[DEBUG]: loadAllPokemonNames hasn't yet initialized properly")
        })()
    }
})


class PokemonProvider extends Component<{},Omit<IPokemonContext,keyof IPokemonContextFunction>>{
    _isMounted = false;
    constructor(props:any){
        super(props)
        this.state = {
            pokemon_name_lists: null
        }
    }

    //
    // ─── SAFE MOUNTING AND UNMOUNTING ───────────────────────────────────────────────
    //

        
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    // ────────────────────────────────────────────────────────────────────────────────



    /**
     * 
     * @returns Promise<void>
     * @note load all the pokemon names into the context
     * @why because (Thiti-Dev) think it's the best idea to hint some user that doesn't even know a single pokemon name to be able to use the search function with auto-completed
     */
    async loadAllPokemonNames(){
        if(this.state.pokemon_name_lists !== null) return // already fetch
        const {data} = await APOLLO_query(
            gql`
            {
                pokemons(first:-1)
                {
                    name
                }
            }
            `
        )
        //TODO handling case of the error here from the graphql
        if(!this._isMounted) return // for getting rid of the testing unmount warning
        this.setState({pokemon_name_lists:data.pokemons.map((ele:any,index:number) => ele.name)})
        console.log('[DEBUG]: all pokemon names has been loaded in to the context')
    }
    render(){
        const {pokemon_name_lists} = this.state
        return (
            <PokemonContext.Provider value={{ pokemon_name_lists,loadAllPokemonNames:this.loadAllPokemonNames.bind(this) }}>
                {this.props.children}
            </PokemonContext.Provider>
        )
    }
}

/**
 * 
 * @param BaseComponent 
 * @returns React.ComponentType
 * @NOTE A wrapper function to get your component wrapped by the PokemonProvider
 */
function withPokemonProvider(BaseComponent: ComponentConstructor<any>): React.ComponentType{
    const $fc:React.FC<any> = () => (
        <PokemonProvider>
            <BaseComponent/>
        </PokemonProvider>
    )

    return $fc
    
}

export {
    PokemonContext,
    PokemonProvider,
    withPokemonProvider
}