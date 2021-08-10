import React from 'react'
import { AppContext } from '../App/AppProvider'
import { SelectableTile, DisabledTile } from '../Shared/Tile'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles({
    root: {
    minWidth: 275,
    color:"#008080",
    fontFamily:"Roboto"
    
    },
    title: {
      fontSize: 14,
      color:"#5072A7",
      fontFamily:"Roboto"
    },
    pos: {
      color:"#662d91",
      fontSize: 14,
      fontFamily:"Roboto"
    },
    extra:{
        color:"#8DA399",
        justifySelf:"right",
        fontSize: 14,
        fontFamily:"Roboto"
    }
  });

function clickFundHandler(fundKey,addFund,confirmFavorites){
    return () => {
        addFund(fundKey);
        confirmFavorites();
    } 
}


export default function FundTile({fundKey}){
    const classes = useStyles();
    return <AppContext.Consumer>
        {
            ({fundList,addFund,isInFavorites,confirmFavorites}) =>{
                let fund = fundList[fundKey];
                let TileClass = SelectableTile;
                if(isInFavorites(fundKey)){
                    TileClass = DisabledTile;
                }

                 return <TileClass onClick={clickFundHandler(fundKey,addFund,confirmFavorites)}>
                            <div class="col s12 m12">
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography className={classes.title}>
                                        <h5>{fund.metaData.fundHouse}</h5>
                                        </Typography>
                                        <Typography className={classes.root}>
                                            <div className="row">
                                                <div className="col">
                                                    {fund.metaData.schemeType}
                                                </div>
                                                <div className="col offset-s9">
                                                    {fund.metaData.schemeCode}
                                                </div>
                                            </div>
                                        </Typography>
                                        
                                        <Typography className={classes.pos}>
                                                    {fund.metaData.schemeName}
                                        </Typography>
                                        <Typography className={classes.extra}>
                                                    {fund.metaData.schemeCategory}
                                        </Typography>
                                    </CardContent>
                                </Card>                   
                            </div>
                    </TileClass>
                    
            }
        }
    </AppContext.Consumer>
}