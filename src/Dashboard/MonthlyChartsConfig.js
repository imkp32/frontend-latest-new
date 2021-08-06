export default function MonthlyChartsConfig(monthArray,returnArray){
    console.log(returnArray);
    return{
        chart: {
            type: 'column',
            style:{
                fontFamily:'roboto'
            }
        },
        title: {
            text: 'Last 3 Months Returns'
        },
        xAxis: {
            categories: monthArray['0']
        },
        yAxis:{
            title: {
                text: 'Returns'
              }
        },
        legend: {
            enabled:false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
        credits: {
            enabled: true
        },
        plotOptions: {
            column: {
                zones: [{
                    value: 0, // Values up to 0 (not including) ...
                    color: 'red' // ... have the color red.
                },{
                    color: 'green' // Values from 0 (including) and up have the color blue
                }]
            }, 
        },
        series: [
            {
            name:'Returns',
            data: returnArray['0']
            },
        ]
           
    }
}
    