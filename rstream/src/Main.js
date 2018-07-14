import React from 'react';
import Login from './Login';
import Queue from './Queue';
import lg from './lg.jpeg';

class Main extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      mode:'login',
    }
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(value)
  {
    this.setState({mode:value});
  }

  render()
  {
    switch(this.state.mode)
    {
      case 'login':
      return (<div className='Login'><img src={lg} className='IMG'/><Login changeMode={this.changeMode}/></div>);
      case 'player':
      return (<Queue/>);
      case 'logout':
      return null;
      default:
      return (<div><img src={lg} className='IMG'/><Login changeMode={this.changeMode}/></div>);

    }
  }
}
export default Main;
