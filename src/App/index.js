import React from 'react'
import './App.css';
import Funds from '../Funds';
import AppLayout from './AppLayout';
import NavBar from './NavBar';
import { AppProvider } from './AppProvider';
import Content from '../Shared/Content';
import Dashboard from '../Dashboard';
import { makeStyles } from '@material-ui/core/styles';
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


export default function App(){
  const classes = useStyles();
    return(
      <AppLayout>
        <AppProvider>
        <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <NavBar/>
                    </Grid>
                    <Grid item xs={12}>
                      <Content>
                        <Funds/>
                        <Dashboard/>
                      </Content>
                    </Grid>
                </Grid>
                
        </div>
        </AppProvider>
      </AppLayout>
     
      
    )
}
