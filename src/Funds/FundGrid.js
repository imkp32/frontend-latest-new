import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import FundTile from './FundTile'

export const FundGridStyled = styled.div`
    display:grid;
    grid-template-columns:repeat(1,1fr);
    grid-gap:15px;
    margin-top:40px;
`


function getFundsToDisplay(fundList,filteredFunds,limit){
    return (filteredFunds && Object.keys(filteredFunds).slice(0,limit)) ||
    Object.keys(fundList).slice(0,limit)
}

export default function FundGrid(){
    return(
        <AppContext.Consumer>
            {
                ({fundList,filteredFunds,limit}) => <FundGridStyled>
                    {getFundsToDisplay(fundList,filteredFunds,limit).map(fundKey =>
                        <FundTile key= {fundKey} fundKey={fundKey}/>)}
                </FundGridStyled>
                
            }
        </AppContext.Consumer>
    )
}