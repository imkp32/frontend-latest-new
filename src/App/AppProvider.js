import React,{Component, createContext} from 'react'
import axios from 'axios'
import _ from 'lodash'
import './styles.css'
import { Route, Switch } from "react-router-dom";



const fundURL ="http://localhost:43716/api/dataservice/mutualfunddata";


const MAX_FAVORITES =1;

export const AppContext = createContext();

export class AppProvider extends Component{

  constructor(props){
      super(props);
      this.state={
          page:"Funds",
          favorites:[0],
          uniqueId:sessionStorage.getItem('uniqueId') ? sessionStorage.getItem('uniqueId'):"60ebf7813f62675e20176661",
          setPage:this.setPage,
          ...this.savedSettings(),
          addFund:this.addFund,
          isInFavorites:this.isInFavorites,
          confirmFavorites:this.confirmFavorites,
          setFilteredFunds:this.setFilteredFunds,
          addId:this.addId,
          limit:4,
          buttonLimit:22,
          setButtonLimit:this.setButtonLimit,
          setLimit:this.setLimit,
          columnDefs:[
            {headerName:'YEAR', field:'yearStats.Year',sortable:true,filter:true,minWidth:50,maxWidth:90},
            {headerName:'JAN', field:'yearStats.Jan',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'FEB', field:'yearStats.Feb',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'MAR', field:'yearStats.Mar',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'APR', field:'yearStats.Apr',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'MAY', field:'yearStats.May',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'JUN', field:'yearStats.Jun',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'JUL', field:'yearStats.Jul',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'AUG', field:'yearStats.Aug',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'SEP', field:'yearStats.Sep',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'OCT', field:'yearStats.Oct',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'NOV', field:'yearStats.Nov',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
            {headerName:'DEC', field:'yearStats.Dec',sortable:true,filter:true,minWidth:50,maxWidth:100,cellClassRules: {'bold-and-red': 'x<0'}},
          ],
          rowData:null,
          monthArray:[],
          returnArray:[],
            
      }
  }


  componentDidMount = ()=>{
      this.fetchFunds();
      this.fetchAllStats();
      this.fetchHistStats();
      this.fetchMonthlyStats();
      this.fetchAnnualStats();
      this.fetchNavStats();
      
  }


  fetchFunds = async() =>{
          await axios.get(fundURL).then((response)=>{
          let fundList = response.data;
          this.setState({fundList});
          //console.log(fundList);
      })
  }
  fetchAnnualStats = async() =>{
    const AnnualURL = "http://localhost:43716/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=AnnualReturns";
    await axios.get(AnnualURL).then((response)=>{
      let annualList = response.data;
      this.setState({annualList});
      //console.log(annualList);
    })
  }

  fetchMonthlyStats = async() =>{
    const MonthlyURL = "http://localhost:43716/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=LastThreeMonthsReturns";
    let returnArray=[];
    let monthArray=[];
    await axios.get(MonthlyURL).then((response)=>{
      let monthlyList = response.data;
      this.setState({monthlyList});
      monthArray.push(Object.keys(monthlyList['timeSeriesList'][0].stats)); 
      returnArray.push(Object.values(monthlyList['timeSeriesList'][0].stats));
      monthArray['0'].splice(0,1);
      returnArray['0'].splice(0,1);
      //console.log(returnArray);
      this.setState({monthArray});
      this.setState({returnArray});
    })
  }

  fetchHistStats = async() =>{
    const HistURL = "http://localhost:43716/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=HistoricalCumulativeReturns";
    let historicalArray = [];
    let dateArray=[];
      await axios.get(HistURL).then((response)=>{
          let historicalList = response.data;
          this.setState({historicalList});
          console.log(historicalList);

          for(var i=0;i<historicalList['timeSeriesList'].length;i++){
            if((historicalList['timeSeriesList'][i].stats.HistoricalCumulativeReturns) !== undefined && (historicalList['timeSeriesList'][i].stats.HistoricalCumulativeReturns) != null)
              historicalArray.push(historicalList['timeSeriesList'][i].stats.HistoricalCumulativeReturns);
              dateArray.push((historicalList['timeSeriesList'][i].date));  
          }
          this.setState({historicalArray});
          this.setState({dateArray});
      })
      
  }

  fetchAllStats = async() =>{
      const fullStatsURL = "http://localhost:43716/api/calculationservice/monthlytimeseries?FundId="+this.state.uniqueId;
      await axios.get(fullStatsURL).then((response)=>{
          let fullCalcList = response.data;
          this.setState({fullCalcList});
          //console.log(fullCalcList); 
      });
  }

  fetchNavStats = async() =>{
    const navStatsURL =  "http://localhost:43716/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=One Day Returns";
    let oneMonthArrayStats =[];
    let oneMonthDateArray=[];
    await axios.get(navStatsURL).then((response)=>{
      let navStatsList = response.data;
      this.setState({navStatsList});
      for(var i =this.state.buttonLimit; i>=0;i--){
        oneMonthArrayStats.push(navStatsList['timeSeriesList'][i].stats.nav);
        oneMonthDateArray.push(navStatsList['timeSeriesList'][i].date);
      }
      this.setState({oneMonthArrayStats});
      this.setState({oneMonthDateArray});
    })
  }

  addId = key => {
    let identity = this.state.fundList[key];
    let uniqueId =[];
    uniqueId.push((Object.values(identity)[0]).toString());
    //console.log('uniqueId '+ uniqueId);
    this.setState({uniqueId});
    this.state['uniqueId']=(Object.values(identity)[0]).toString();
    }

  addFund = key => {
      let favorites = [];
      if(favorites.length < MAX_FAVORITES){
          favorites.push(key);
          this.setState({favorites});
          this.addId(key);
          
      }
      
  }


  isInFavorites = key => _.includes(this.state.favorites,key)

  setFilteredFunds = (filteredFunds) => this.setState({filteredFunds});

  setPage = page =>{
    this.setState({page});
  }
  setLimit = limit => this.setState({limit});
  setButtonLimit = buttonLimit => {
    this.setState({buttonLimit});
    this.fetchNavStats();
  }

  confirmFavorites=()=>{
      let currentFund = this.state.uniqueId;
      this.setState({
          firstVisit:false,
          page:"Dashboard",
          uniqueId:currentFund,
      },()=>{
        this.fetchHistStats();
        this.fetchAllStats();
        this.fetchMonthlyStats();
        this.fetchAnnualStats();
        this.fetchAllStats();
        this.fetchNavStats();
      }
     )
     
      sessionStorage.setItem('financialDash',JSON.stringify({
          favorites:this.state.favorites,
          uniqueId:currentFund
      }))
      sessionStorage.setItem('uniqueId',currentFund);
  }

 

  savedSettings(){
      let financialDashData = JSON.parse(sessionStorage.getItem('financialDash'));
      if(!financialDashData){
          return{
              page:'Funds',firstVisit:true
          }
      }
      let {favorites,currentFund} = financialDashData; 
      return{favorites,currentFund};
  }

  

  render(){
    return(
        <AppContext.Provider value={this.state}>
            {this.props.children}
        </AppContext.Provider>
    )
  }
}