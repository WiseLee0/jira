import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool'
import { AppProvider } from 'appProvider';
import { App } from 'App';
import 'antd/dist/antd.less'

loadServer(() => ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <DevTools></DevTools>
      <App></App>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
