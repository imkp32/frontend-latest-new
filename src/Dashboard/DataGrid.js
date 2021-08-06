import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AppContext } from '../App/AppProvider';

export default function DataGrid(){
    return(
        <AppContext.Consumer>
            {
                ({columnDefs,fullCalcList})=>(
                    <div id="myGrid" className ="ag-theme-balham" style={{height:"450px",width:"100%"}}>
            <AgGridReact
            columnDefs = {columnDefs}
            rowData = {fullCalcList['timeSeriesList']}
            />
        </div>
                )
            }
        </AppContext.Consumer>
        
    )
}