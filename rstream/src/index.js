import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import Queue from './Queue';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import YoutubeSearch from './YoutubeSearch';
console.log(sessionStorage.token);
window.controlSocket = new WebSocket('ws://127.0.0.1:8000/ws/control/');
ReactDOM.render(<Login/>, document.getElementById('root'));
ReactDOM.render(<div><YoutubeSearch/></div>,document.getElementById('root2'))
registerServiceWorker();
