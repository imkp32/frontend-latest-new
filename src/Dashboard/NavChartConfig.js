import { green } from "@material-ui/core/colors";

export default function NavChartConfig(oneMonthArrayStats,oneMonthDateArray){
    //console.log(historicalArr);
    return{
      chart: {
        style:{
            fontFamily:'roboto'
        }
    },
  
    title: {
        text: ''
      },
    
      subtitle: {
        text: 'MarketView Analytics'
      },
    
      yAxis: {
        title: {
          text: ''
        },
        labels:{
            enabled:true
        }
      },
    
      xAxis: {
       categories:oneMonthDateArray,
       labels: {
        enabled:false
       }
      },
      
    
      legend: {
        enabled:false
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: true
          },
        }
      },
    
    
      series: [{
        name: 'NAV',
        data: oneMonthArrayStats,
        color:'red'
}],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    }
}
    