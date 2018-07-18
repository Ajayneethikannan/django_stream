import React from 'react';
import Login from './Login';
import Queue from './Queue';
import SignUp from './SignUp';
import lg from './lg.jpeg';
import axios from 'axios';
class Main extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      mode:'login',
    }
    this.changeMode = this.changeMode.bind(this);
    this.Logout = this.Logout.bind(this);
  }
  changeMode(value)
  {
    this.setState({mode:value});
  }
  Logout()
  {let self = this;
    axios.post('http://127.0.0.1:8000/logout/').then(
      function(response)
      {
        console.log(response.data);
      }
    ).then(function()
  {
    self.changeMode('login');
    sessionStorage.removeItem('token');
  });


  }
  render()
  {
    switch(this.state.mode)
    {
      case 'login':
      return (<div className='Login'><img src={lg} className='IMG'/><Login changeMode={this.changeMode}/></div>);break;
      case 'player':
      return (<Queue Logout={this.Logout}/>);break;
      case 'logout':
      return null;break;
      case 'signup':
      return (<div className='Login'><img src={lg} className='IMG'/><SignUp changeMode={this.changeMode}/></div>);break;
      default:
      return (<div className='Login'><img src={lg} className='IMG'/><Login changeMode={this.changeMode}/></div>);

    }
  }
}
export default Main;
