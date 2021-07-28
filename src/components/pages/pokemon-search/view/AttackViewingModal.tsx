import React from 'react'
import { SxProps, SystemProps } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { IPokemon } from '../../../../shared/interfaces/pokemon.interface';
import styled from '@emotion/styled';

interface IProps{
    visible: boolean
    type: "normal" | "special"
    attack_datas: IPokemon['attacks']['special'] | IPokemon['attacks']['fast'] | null
    on_close: () => void
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
} as SxProps<any>;

const HeaderText = styled.h6`
      font-family: 'Press Start 2P', cursive;
      margin-bottom: 44px;
      text-align: center;
`

const AttackDataTypography = styled.h6`
      font-family: 'Press Start 2P', cursive;
`

const AttackDataContainer = styled.div`
  width:100%;
  height:100%;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AttackViewingModal:React.FC<IProps> = ({type,attack_datas,visible,on_close}) => {
  return (
    <Modal open={visible} onClose={on_close} aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
        <Box sx={style}>
          <HeaderText>{type==="normal" ? "Normal" : "Special"} Attack Lists</HeaderText>
          {
            attack_datas?.map((attack_data) => {
              return <Card elevation={8} sx={{ display: 'flex',paddingLeft:2,paddingRight:2 }}>
                  <AttackDataContainer>
                    <div>
                      <AttackDataTypography>{attack_data.name}</AttackDataTypography>
                      <AttackDataTypography>type: {attack_data.type}</AttackDataTypography>
                    </div>
                    <AttackDataTypography>Damage:{attack_data.damage}</AttackDataTypography>
                  </AttackDataContainer>
              </Card>
            })
          }
        </Box>
    </Modal>
  )
}

export default AttackViewingModal