import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import YoutubeSearch from './YoutubeSearch';
ReactDOM.render(<Login />, document.getElementById('root'));
ReactDOM.render(<YoutubeSearch/>,document.getElementById('root2'))
registerServiceWorker();
