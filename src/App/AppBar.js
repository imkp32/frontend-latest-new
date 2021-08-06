import React from 'react'
import './styles.css'
import { AppContext } from './AppProvider'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


// const BarStyle = styled.div`
//     display : grid;
//     grid-template-columns:180px auto 100px 100px;
// `

export default function AppBar(){
    return (
        <AppContext.Consumer>
            {
                ({setPage})=>(
                <nav>
                    <Router>
                        <div class="nav-wrapper">
                            <a href="/Funds" class="brand-logo center" onClick={()=>setPage("Funds")}>MarketView</a>
                                <ul  class="right hide-on-med-and-down">
                                        <li><Link to="/Funds" onClick={()=>setPage("Funds")}>Funds</Link></li>              
                                </ul>
                        </div>
                        </Router>
                    </nav>
                    
        
                )     
            }
        </AppContext.Consumer>
                                                       
    )
            
}