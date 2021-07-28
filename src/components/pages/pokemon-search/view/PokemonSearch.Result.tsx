import styled from '@emotion/styled';
import React, { useState } from 'react'
import { IPokemon } from '../../../../shared/interfaces/pokemon.interface';
import { PokeCardTemplate,PokeCardImage, PokeCardName,PokeCardHPCPText,PokeCardHPCPBar,PokeDescriptionBody,PokeCardDescriptionText } from './PokemonSearch.styles';
import Chip from '@material-ui/core/Chip';
import Alert from '@material-ui/core/Alert';
import AttackViewingModal from './AttackViewingModal';

interface IProps{
    pokemon: IPokemon | null | undefined
    view_pokemon: (name:string|null) => void
    loading: boolean
}

const ContentContainer = styled.div`
    width: 100%;
    height: 500px;
    /* background-color: wheat; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const SideContent = styled.div`
    font-family: 'Press Start 2P', cursive;
    font-size: 10px;
    margin-left: 20px;
`

const SideContentItem = styled.div`
    margin-bottom: 10px;
`


const PokemonSearchResult:React.FC<IProps> = ({pokemon,view_pokemon,loading}) => {
    const [viewingAttackData,setViewingAttackData] = useState<{type: "normal"|"special",attack_datas:IPokemon['attacks']['special'] | IPokemon['attacks']['fast'] | null }>({attack_datas:null,type:"normal"})
    if(!pokemon && !loading) return <Alert variant="filled" severity="error">
    The pokemon that you tryna search isn't existed in the pokemon world!!! try again
  </Alert>
    if(!pokemon) return null
    const {name,maxHP,maxCP,image,height,weight,fleeRate,types,evolutions,attacks:{fast:fastAttacks,special:specialAttacks},weaknesses,resistant} = pokemon

    //
    // ─── CALLBACKS ──────────────────────────────────────────────────────────────────
    //
    function onViewAttacks(type: "normal"|"special",attack_datas:  IPokemon['attacks']['special'] | IPokemon['attacks']['fast']){
        setViewingAttackData({type,attack_datas})
    }
    function onStopViewingAttacks(){
        setViewingAttackData({type:"normal",attack_datas: null})
    }
    // ────────────────────────────────────────────────────────────────────────────────


    return (
            <ContentContainer>
                <AttackViewingModal visible={viewingAttackData.attack_datas===null ? false : true} type={viewingAttackData.type} attack_datas={viewingAttackData.attack_datas} on_close={onStopViewingAttacks}/>
                <PokeCardTemplate>
                    <PokeCardName>{name}</PokeCardName>
                    <PokeCardImage img_path={image}/>
                    <PokeCardHPCPBar>
                        <PokeCardHPCPText>MaxHP:{maxHP}</PokeCardHPCPText> 
                        <PokeCardHPCPText>MaxCP:{maxCP}</PokeCardHPCPText> 
                    </PokeCardHPCPBar>
                    <PokeDescriptionBody>
                        <PokeCardDescriptionText>Height:{height.minimum} - {height.maximum}</PokeCardDescriptionText>
                        <PokeCardDescriptionText>Weight:{weight.minimum} - {weight.maximum}</PokeCardDescriptionText>
                        <PokeCardDescriptionText>FleeRate:{fleeRate}</PokeCardDescriptionText>
                        <PokeCardDescriptionText>Types:{types.join(",")}</PokeCardDescriptionText>
                    </PokeDescriptionBody>
                </PokeCardTemplate>
                <SideContent>
                    <SideContentItem> Name: <Chip label={name} size="small" /></SideContentItem>
                     <SideContentItem> Types: {
                            types.map((poketype,index) => (
                                
                                    <Chip key={`POKETYPE-${index}`} style={{ marginRight:3 }} size="small" label={poketype} color="secondary" variant="outlined" />
                            ))
                        }
                    </SideContentItem>
                    {
                        evolutions ? <SideContentItem> Evolution: {
                            (evolutions).map((evodata) => <Chip key={evodata.name} onClick={() => view_pokemon(evodata.name)} clickable style={{ marginRight:3 }} size="small" label={evodata.name} color="success" variant="outlined" />)
                         }
                     </SideContentItem> : <SideContentItem>
                         Evolutions: <Chip style={{ marginRight:3 }} size="small" label="No evolution" color="success" variant="outlined" />
                     </SideContentItem> 
                    }
                    <SideContentItem>
                        {
                            resistant ? <SideContentItem> Resistants: {
                                (resistant).map((resistantType) => <Chip key={resistantType} style={{ marginRight:3 }} size="small" label={resistantType} color="primary" variant="outlined" />)
                             }
                         </SideContentItem> : <SideContentItem>
                         Resistants: <Chip style={{ marginRight:3 }} size="small" label="No resistants" color="success" variant="outlined" />
                         </SideContentItem> 
                        }
                    </SideContentItem>
                    <SideContentItem>
                        {
                            weaknesses ? <SideContentItem> Weaknesses: {
                                (weaknesses).map((weaknessType) => <Chip key={weaknessType} style={{ marginRight:3 }} size="small" label={weaknessType} color="error" variant="outlined" />)
                             }
                         </SideContentItem> : <SideContentItem>
                         Weaknesses: <Chip style={{ marginRight:3 }} size="small" label="No weakness" color="success" variant="outlined" />
                         </SideContentItem> 
                        }
                    </SideContentItem>
                    <SideContentItem>
                        Normal Attack:  <Chip onClick={onViewAttacks.bind(null,"normal",fastAttacks)} clickable style={{ marginRight:3 }} size="small" label={`View ${fastAttacks.length} normal attack`} color="warning" />
                    </SideContentItem>
                    <SideContentItem>
                        Special Attack:  <Chip onClick={onViewAttacks.bind(null,"special",specialAttacks)} clickable style={{ marginRight:3 }} size="small" label={`View ${specialAttacks.length} special attack`} color="error" />
                    </SideContentItem>
                </SideContent>
            </ContentContainer>
    )
}

export default PokemonSearchResult
