import React from 'react';
import {Button, Form, Icon} from 'semantic-ui-react';
import axios from 'axios';
class SignUp extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      username:'',
      email:'',
      password1:'',
      password2:'',
      error:'',
    };
    this.Submit = this.Submit.bind(this);
    this.Change = this.Change.bind(this);
  }
  Submit(){
    let that = this;
    axios.post('http://127.0.0.1:8000/rest-auth/registration/',
    {
      'username':that.state.username,
      'password1':that.state.password1,
      'password2':that.state.password2,
      'email':that.state.email,
    }).then(
      function(response)
      {
        if(response.data.key){
          alert("successfully created!");
          that.changeMode('login');
        }
      }
    )

  }
  Change(event)
  {
    const key = event.target.id.toString();

    switch(key){
      case 'username':
          this.setState({username:event.target.value});break;
      case 'password1':
          this.setState({password1:event.target.value});break;
      case 'password2':
          this.setState({password2:event.target.value});break;
      case 'email':
          this.setState({email:event.target.value});break;
      default:
          console.log('');

    }

  }
  render()
  {
    return(
      <div className='login-form'>
        <Form >
        <Icon name="angle left" size="huge" onClick={()=>{this.props.changeMode('login')}}/>
        <h2>Sign up....</h2>

        <Form.Input label='Username' id="username"  placeholder='enter your username' onChange={this.Change} value={this.state.username}/>
        <Form.Input label='Password'  id="password1" placeholder='enter your password'type='password' onChange={this.Change}  value={this.state.password1}/>
          <Form.Input label='Confirm password' id="password2"  placeholder='confirm your password'type='password' onChange={this.Change}  value={this.state.password2}/>
          <Form.Input label='Email' id="email"  placeholder='enter your email id' onChange={this.Change}  value={this.state.email}/>

        <Form.Button onClick={() => {this.Submit()}} >Submit</Form.Button>

        </Form>
        <div><b>{this.state.error}</b></div>
        </div>
    );
  }
}
export default SignUp;
