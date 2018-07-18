import React, { Component } from 'react';
import {Form} from 'semantic-ui-react';
import Queue from './Queue';
import './index.css';
var axios = require('axios');


//using mouseover and mouseout events //

class Login extends Component {
  constructor(props)
   {
     super(props);
     this.state = {username:'',
                   password:'',};
     this.Submit = this.Submit.bind(this);
     this.Change1 = this.Change1.bind(this);
     this.Change2 = this.Change2.bind(this);



   }


   Change1(event)
   {
     this.setState({username:event.target.value});
   }
   Change2(event)
   {
     this.setState({password:event.target.value})
   }
  Submit()
  {
       let self = this;
       const username = this.state.username;
       const password = this.state.password;
      console.log(username);
      console.log(password);
       fetch("http://127.0.0.1:8000/rest-auth/login/",{
           method:'post',
           body:JSON.stringify({'username': username,

                 'password': password,}),
              headers:{'content-type': 'application/json'}

               }).then(function(response){
                 return response.json();
               }).then(function(data){
                 if(data["key"])
                 {
                   sessionStorage.token = data["key"];
                   console.log(sessionStorage.token);
                   axios.defaults.headers.common["Authorization"] = "Token "+ data["key"];


                             window.controlSocket.send(JSON.stringify({
                               'token':sessionStorage.token,

                             }))  ;


                self.props.changeMode('player');

                 }
                 else {
                   {
                     self.setState({error:"try again!"});
                   }
                 }
               });



  }




   render()
   {

      return(
        <div className='login-form'>
          <Form >
          <h2>Login....</h2>
          <Form.Input label='Username'  placeholder='enter your username' onChange={this.Change1} value={this.state.username}/>
          <Form.Input label='Password'  placeholder='enter your password'type='password' onChange={this.Change2}  value={this.state.password}/>

          <Form.Button onClick={() => {this.Submit()}} >Submit</Form.Button>

          </Form>
          <div><b>{this.state.error}</b></div>
          <div className="sign-up" ><h3 onClick={()=>{this.props.changeMode('signup')}}>Sign Up</h3></div>
          </div>
      );




   }






  }
//AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk

export default Login;
