import React from 'react'
import { AppContext } from '../App/AppProvider'
import MonthlyChartsConfig from './MonthlyChartsConfig';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Tile } from '../Shared/Tile'


export default function MonthlyCharts(){
    return(
        <AppContext.Consumer>
            {({monthArray,returnArray})=>
            <Tile>
                <HighchartsReact highcharts={Highcharts} options={MonthlyChartsConfig(monthArray,returnArray)} />
            </Tile>
}
        </AppContext.Consumer>
    )
}