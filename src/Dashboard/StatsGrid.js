import React from 'react'
import { AppContext } from '../App/AppProvider';
import M from 'materialize-css'

export default function StatsGrid(){
    var elem = document.querySelector('.tabs'); 
    var instance = M.Tabs.init(elem, {});
    return(
        <AppContext.Consumer>
            {
                ({annualList})=>(
                    <div class="card">
                        <div class="card-content">
                        <p>ANNUAL RETURNS</p>
                        </div>
                    <div class="card-tabs">
                      <ul class="tabs tabs-fixed-width">
                        <li class="tab"><a class="active" href="#test4">1 Year</a></li>
                        <li class="tab"><a href="#test5">3 Years</a></li>
                        <li class="tab"><a href="#test6">5 Years</a></li>
                        <li class="tab"><a href="#test7">Annualized</a></li>
                      </ul>
                    </div>
                    <div class="card-content grey lighten-4">
                      <div id="test4">{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast1Year}</div>
                      <div id="test5">{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast3Year}</div>
                      <div id="test6">{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast5Year}</div>
                      <div id="test7">{annualList['timeSeriesList'][0].stats.AnnualizedReturn}</div>
                    </div>
                  </div>
                  
                )
            }
        </AppContext.Consumer>
    )
    
}


