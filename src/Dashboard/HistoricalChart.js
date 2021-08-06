import React from 'react'
import { AppContext } from '../App/AppProvider'
import HistoricalChartsConfig from './HistoricalChartsConfig';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Tile } from '../Shared/Tile'


export default function HistoricalChart(){
    return(
        <AppContext.Consumer>
            {({dateArray,historicalArray})=>
            <Tile>
                <HighchartsReact highcharts={Highcharts} options={HistoricalChartsConfig(dateArray,historicalArray)} />
            </Tile>
}
        </AppContext.Consumer>
    )
}