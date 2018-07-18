import React from 'react';
import axios from 'axios';
import {Button, Form} from 'semantic-ui-react';
class UserControl extends React.Component{
  constructor(props)
  {
    super(props);
    this.state ={users:'',
    user:'',
    changing:false,
    year:'',
    tag:'',
    };
    this.Change1 = this.Change1.bind(this);
    this.Change2 = this.Change2.bind(this);
    this.Change = this.Change.bind(this);
    this.update = this.update.bind(this);
  }
  componentDidMount()
  {
    this.update();
  }
  update()
  {
    let that = this;
      axios.get('http://127.0.0.1:8000/user/').then(
        function(response)
        {
          that.setState({users:response.data});
        }
      );
      axios.post('http://127.0.0.1:8000/user/').then(
        function(response)
        {
          that.setState({user:response.data,
                          year:response.data.year,
                          tag:response.data.tag,});
        }
      );
  }
  Change1(event)
  {
    this.setState({year:event.target.value});

  }
  Change2(event)
  {
    this.setState({tag:event.target.value});

  }
  Change()
  {let that = this;
    if(!this.state.changing)
    {
      axios.post('http://127.0.0.1:8000/user/',
    {
      'year':this.state.year,
      'tag':this.state.tag,
    }).then(function(response)
  {
     that.update();
  })
    }
    this.setState({changing:!this.state.changing});
  }

  render()
  {
    let that = this;
    const a = (<div >
    <h3>Name: {this.state.user.username}</h3>
    <h3>Year: {this.state.user.year}</h3>
    <h3>Level: {this.state.user.level}</h3>
     <h3>Tag: {this.state.user.tag}</h3>
     </div>);
     const b = (<div className="user">
       <Form.Input label='year'  onChange={this.Change1} value={this.state.year}/>
       <Form.Input label='tag'  onChange={this.Change2} value={this.state.tag}/>
       </div>);
    const users = Array.from(this.state.users).map(function(user)
  {
    const style = { border:'white 2px solid',color:'white!important',padding:'2vh',margin:'2vh'};

    return (<div style={style}>
            <h4>Name: {user.username}</h4>
            <h4>Year: {user.year}</h4>
            <h4>Level: {user.level}</h4>
            <h4>Tag: {user.tag}</h4>

            </div>);
  });


  console.log(this.state.user);
  return (
  <div className="user-control">
  <div >
  {this.state.changing?a:b}
   <div>
  <Button onClick={this.Change}>Change</Button>
  <Button onClick={this.props.Logout}>Logout</Button>
  </div>
  </div>
  <div className="user-list">
  {users}
  </div>
  </div>

  );
  }
}
export default UserControl;
