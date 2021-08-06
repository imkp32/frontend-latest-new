import React from 'react'
import './App.css';
import Funds from '../Funds';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Content from '../Shared/Content';
import Dashboard from '../Dashboard';



export default function App(){
    return(
      <AppLayout>
        <AppProvider>
          <AppBar/>
            <Content>
              <Funds/>
              <Dashboard/>
            </Content>
        </AppProvider>
      </AppLayout>
      
    )
}
