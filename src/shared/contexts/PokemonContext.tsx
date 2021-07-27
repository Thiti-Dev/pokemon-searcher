import React, { Component, ComponentClass, ReactElement, StatelessComponent } from 'react'
type ComponentConstructor<P> = ComponentClass<P> | StatelessComponent<P>;

interface IPokemonContext{
    pokemon_name_lists: string | null // null is the default value -> haven't yet fetched
}

const PokemonContext = React.createContext<IPokemonContext>({
    pokemon_name_lists: null
})


class PokemonProvider extends Component<{},IPokemonContext>{
    constructor(props:any){
        super(props)
        this.state = {
            pokemon_name_lists: null
        }
    }
    render(){
        const {pokemon_name_lists} = this.state
        return (
            <PokemonContext.Provider value={{ pokemon_name_lists }}>
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