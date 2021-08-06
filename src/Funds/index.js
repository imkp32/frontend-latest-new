import React from 'react'
import Page from '../Shared/Page'
import FundGrid from './FundGrid'
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search'
import LoadMore from './LoadMore'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));




export default function Funds(){
    const classes = useStyles();
    return(
        <Page name="Funds">
             <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Search/>
                    </Grid>
                    <Grid item xs={12}>
                        <FundGrid/>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadMore/>
                    </Grid>
                </Grid>
            </div>
        </Page>
    )
}