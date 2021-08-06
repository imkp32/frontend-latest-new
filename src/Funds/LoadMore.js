import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';



const CenterDiv = styled.div`
    display:grid;
    justify-content:center;
`

export default function LoadMore(){

    return(
        <AppContext.Consumer>{
            ({setLimit,limit})=>
            <CenterDiv>     
                <Button onClick={()=>setLimit(limit+4)} variant="contained" color="primary">
                    Load More
                </Button>
            </CenterDiv>
            }
            
        </AppContext.Consumer>
            
    )
}

