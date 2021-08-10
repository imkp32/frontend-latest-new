import React from 'react'
import { AppContext } from '../App/AppProvider'
import DataGrid from './DataGrid'
import HistoricalChart from './HistoricalChart'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StatsGrid from './StatsGrid'
import MonthlyCharts from './MonthlyCharts'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import NavChart from './NavChart'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        fontSize: 14,
        fontWeight:"bold",
      },
      
}));


export default function MainGrid(){
    const classes = useStyles();
    return(
        <AppContext.Consumer>
            {
                ({setButtonLimit,historicalList}) =>
                 <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                                <h5>{historicalList.fundName} - {historicalList.schemeName} - {historicalList.schemeType}</h5>
                    </Grid>
                    <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="black" gutterBottom>
                                       NAV Returns 
                            </Typography>
                            <Button onClick={()=>setButtonLimit(22)} variant="contained" color="default">
                                1M
                            </Button>
                            <Button onClick={()=>setButtonLimit(66)} variant="contained" color="default">
                                3M
                            </Button>
                            <Button onClick={()=>setButtonLimit(132)} variant="contained" color="default">
                                6M
                            </Button>
                            <Button onClick={()=>setButtonLimit(252)} variant="contained" color="default">
                                1Y
                            </Button>
                            <NavChart/>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="black" gutterBottom>
                                       TIME SERIES
                            </Typography>
                            <DataGrid/>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                                <Typography className={classes.title} color="black" gutterBottom>
                                       LAST 3 MONTHS RETURNS
                                </Typography>
                            <MonthlyCharts/>
                        </CardContent>
                    </Card>  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                                <Typography className={classes.title}  color="black" gutterBottom>
                                       STATISTICS
                                </Typography>
                                <StatsGrid/>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={12}>
                    <Card>
                        <CardContent>
                                <Typography className={classes.title} color="black" gutterBottom >
                                       HISTORICAL CUMULATIVE RETURNS
                                </Typography>
                            <HistoricalChart/>
                        </CardContent>
                    </Card>
                    </Grid>
                </Grid>
                </div>
            }
        </AppContext.Consumer>
    )

}