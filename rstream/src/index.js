import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Queue from './Queue';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import YoutubeSearch from './YoutubeSearch';
import lg from  './lg.jpeg';
import Main from './Main';
console.log(sessionStorage.token);
window.controlSocket = new WebSocket('ws://127.0.0.1:8000/ws/control/');
ReactDOM.render(<Main/>, document.getElementById('root'));
ReactDOM.render(<YoutubeSearch className="YTSearch"/>,document.getElementById('root2'))
registerServiceWorker();
