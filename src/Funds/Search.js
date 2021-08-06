import React from 'react'
import styled from 'styled-components'
import { AppContext } from '../App/AppProvider'
import _ from 'lodash'
import fuzzy from 'fuzzy'

const SearchGrid = styled.div`
    display:grid;
    grid-template-columns:10px, 1fr;
`


const handleFilter = _.debounce((inputValue,fundList,setFilteredFunds) => {
    //Get all the fund keys
    let fundKeys = Object.keys(fundList);
    // Get all the fund names, map key to name
    let fundNames = fundKeys.map(key => fundList[key].metaData.fundHouse);
    let allStringstoSearch = fundKeys.concat(fundNames)
    let fuzzyResults = fuzzy.filter(inputValue,allStringstoSearch,{}).map(result => result.string);

    let filteredFunds = _.pickBy(fundList,(result,newKey) => {
        let fundName = result.metaData.fundHouse;
        return (_.includes(fuzzyResults,newKey) || _.includes(fuzzyResults,fundName));
    })
    console.log(filterFunds);
    setFilteredFunds(filteredFunds);
},500)

function filterFunds(e,setFilteredFunds,fundList){
    let inputValue=e.target.value;
    if(!inputValue){
        setFilteredFunds(null);
        return;
    }
    handleFilter(inputValue,fundList,setFilteredFunds)
}

export default function Search(){

    return(
        <AppContext.Consumer>
            {
                ({setFilteredFunds,fundList}) => 
                <SearchGrid>
                    <div class="input-field col s12 m12">
                            <i class="material-icons prefix">search</i>
                                <textarea onKeyUp={(e) => filterFunds(e,setFilteredFunds,fundList)}  id="icon_prefix2" class="materialize-textarea"></textarea>
                                    <label for="icon_prefix2">Search All Funds</label>
                    </div>
                </SearchGrid>

            }
        </AppContext.Consumer>
        
    )
}