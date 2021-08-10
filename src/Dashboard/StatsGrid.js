import React from 'react'
import { AppContext } from '../App/AppProvider';
import './styles.css'

export default function StatsGrid(){
    
    return(
        <AppContext.Consumer>
            {
                ({annualList})=>(
                  <table class="highlight"  className = "gap">
                  <thead>
                    <tr>
                        <th>Stats</th>
                        <th>Growth Rate</th>
                    </tr>
                  </thead>
          
                  <tbody>
                    <tr>
                      <td>Annualized Return</td>
                      <td>{annualList['timeSeriesList'][0].stats.AnnualizedReturn}</td>
                    </tr>
                    <tr>
                      <td>Annualized Return Last 1 Year</td>
                      <td>{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast1Year}</td>
                    </tr>
                    <tr>
                      <td>Annualized Return Last 3 Years</td>
                      <td>{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast3Year}</td>
                    </tr>
                    <tr>
                      <td>Annualized Return Last 5 Years</td>
                      <td>{annualList['timeSeriesList'][0].stats.AnnualizedReturnLast5Year}</td>
                    </tr>
                  </tbody>
                </table>
                )
            }
        </AppContext.Consumer>
    )
    
}


