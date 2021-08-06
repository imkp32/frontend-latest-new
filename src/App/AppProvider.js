import React,{Component, createContext} from 'react'
import axios from 'axios'
import _ from 'lodash'



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
          setLimit:this.setLimit,
          columnDefs:[
            {headerName:'YEAR', field:'date',sortable:true,filter:true,valueFormatter: this.dateFormatter,minWidth:50,maxWidth:90},
            {headerName:'JAN', field:'stats.nav',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'FEB', field:'stats.1 Day Returns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'MAR', field:'stats.1 Month Returns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'APR', field:'stats.1 Quarter Returns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'MAY', field:'stats.MonthToDate',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'JUN', field:'stats.YearToDate',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'JUL', field:'stats.LastWeekReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'AUG', field:'stats.LastMonthReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'SEP', field:'stats.LastYearReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'OCT', field:'stats.LastQuarterReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'NOV', field:'stats.LastQuarterReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
            {headerName:'DEC', field:'stats.LastQuarterReturns',sortable:true,filter:true,minWidth:50,maxWidth:100},
          ],
          rowData:null,
          navArr:[],
          dateArr:[],
          historicalArr:[],
          monthArray:[],
          returnArray:[],
            
      }
  }
  dateFormatter(params) {
    var date = new Date(params.data.date);
    return date.getFullYear();
  }

  componentDidMount = ()=>{
      this.fetchFunds();
      this.fetchAllStats();
      this.fetchHistStats();
      this.fetchMonthlyStats();
      this.fetchAnnualStats();
      
  }


  fetchFunds = async() =>{
          await axios.get(fundURL).then((response)=>{
          let fundList = response.data;
          this.setState({fundList});
          console.log(fundList);
      })
  }
  fetchAnnualStats = async() =>{
    const AnnualURL = "http://35.244.48.50/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=AnnualReturns";
    await axios.get(AnnualURL).then((response)=>{
      let annualList = response.data;
      this.setState({annualList});
      console.log(annualList);
    })
  }

  fetchMonthlyStats = async() =>{
    const MonthlyURL = "http://35.244.48.50/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=LastThreeMonthsReturns";
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
    const HistURL = "http://35.244.48.50/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=HistoricalCumulativeReturns";
    let historicalArray = [];
    let dateArray=[];
      await axios.get(HistURL).then((response)=>{
          let historicalList = response.data;
          this.setState({historicalList});
          //console.log(historicalList);

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
      const fullStatsURL = "http://35.244.48.50/api/calculationservice?FundId="+this.state.uniqueId+"&StatName=1 Day Returns,1 Month Returns, 1 Week Returns,1 Quarter Returns, 1 Year Returns, WeekToDate,MonthToDate,YearToDate, QuarterToDate,LastWeekReturns,LastMonthReturns,LastYearReturns,LastQuarterReturns";
      
      let navArr=[];
      await axios.get(fullStatsURL).then((response)=>{
          let fullCalcList = response.data;
          this.setState({fullCalcList});
          //console.log(fullCalcList);
          
          for(var i=0;i<fullCalcList['timeSeriesList'].length;i++)
          {
              navArr.push(fullCalcList['timeSeriesList'][i].stats.nav);  
          }
      });

      this.setState({navArr});
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

  setPage = page =>this.setState({page});
  setLimit = limit => this.setState({limit});

  confirmFavorites=()=>{
      let currentFund = this.state.uniqueId;
      this.setState({
          firstVisit:false,
          page:"Dashboard",
          uniqueId:currentFund,
      },()=>{
        window.history.replaceState(null, "Dashboard", "/Dashboard/"+this.state.uniqueId);
        this.fetchHistStats();
        this.fetchAllStats();
        this.fetchMonthlyStats();
        this.fetchAnnualStats();
        this.fetchAllStats();
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