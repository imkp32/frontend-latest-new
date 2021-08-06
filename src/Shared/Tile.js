import styled from "styled-components";
import {  lightBlueBackground, blueBoxShadow,redBoxShadow } from "./Styles";

export const Tile = styled.div`
    ${lightBlueBackground}
`

export const SelectableTile =styled(Tile)`
    &:hover{
        cursor:pointer;
        ${blueBoxShadow}
    }
`

export const TopTile = styled(SelectableTile)`
    &:hover{
        cursor:pointer;
        ${redBoxShadow}
    }
`

export const DisabledTile = styled(Tile)`
    pointer-events:none;
    opacity:0.4;
`