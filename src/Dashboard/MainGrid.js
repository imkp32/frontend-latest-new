import React from 'react'
import { AppContext } from '../App/AppProvider'
import { Tile } from '../Shared/Tile'
import DataGrid from './DataGrid'
import HistoricalChart from './HistoricalChart'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatsGrid from './StatsGrid'
import MonthlyCharts from './MonthlyCharts'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
}));


export default function MainGrid(){
    const classes = useStyles();
    return(
        <AppContext.Consumer>
            {
                ({fullCalcList}) =>
                 <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <p class="z-depth-1"><h4>{Object.values(fullCalcList)[0]}</h4></p>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MonthlyCharts/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StatsGrid/>
                    </Grid>
                    <Grid item xs={12}>
                        <Tile>
                            <HistoricalChart/>
                        </Tile>
                    </Grid>
                </Grid>
                </div>
            }
        </AppContext.Consumer>
    )

}