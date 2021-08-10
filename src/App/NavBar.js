import React from 'react'
import './styles.css'
import { AppContext } from './AppProvider'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import MultilineChartSharpIcon from '@material-ui/icons/MultilineChartSharp';
import { Link } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    icon:{
      fontSize:"30px",
    },
    bar:{
      backgroundColor: "#488A99" 
    }
  }));

export default function NavBar(){
    const classes = useStyles();
    return (
        <AppContext.Consumer>
            {
                ({setPage})=>(
                    <AppBar className={classes.bar} position="fixed">
                    <Toolbar>
                      <Typography variant="h4" className={classes.title} align="center">
                        <MultilineChartSharpIcon className={classes.icon}/> MarketView  
                      </Typography>
                      <Button onClick={()=>setPage("Funds")} color="inherit">Funds</Button>
                    </Toolbar>
                  </AppBar>
                )     
            }
        </AppContext.Consumer>
                                                       
    )
            
}