import React from 'react'
import { AppContext } from '../App/AppProvider'
import NavChartConfig from './NavChartConfig'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Tile } from '../Shared/Tile'


export default function HistoricalChart(){
    return(
        <AppContext.Consumer>
            {({oneMonthArrayStats,oneMonthDateArray})=>
            <Tile>
                <HighchartsReact highcharts={Highcharts} options={NavChartConfig(oneMonthArrayStats,oneMonthDateArray)} />
            </Tile>
}
        </AppContext.Consumer>
    )
}