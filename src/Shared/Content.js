import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function Content(props){
    return <AppContext.Consumer>
        {
            ({fundList,fullCalcList,firstVisit}) =>{
                if(!fundList){
                    return <div>Loading Funds</div>
                }
                if(!firstVisit && !fullCalcList){
                    return <div>Loading Statistics</div>
                }
                return <div>{props.children}</div>
            }
        }
    </AppContext.Consumer>
}