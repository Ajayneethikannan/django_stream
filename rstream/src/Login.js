import React, { Component } from 'react';
import './Login.css';
import {Form} from 'semantic-ui-react';
var axios = require('axios');

//using mouseover and mouseout events //

class Login extends Component {
  constructor(props)
   {
     super(props);
     this.state = {username:'',
                   password:'',
                   visible:true};
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

       fetch("http://127.0.0.1:8000/login/",{
           method:'post',
           body:JSON.stringify({'username': username,

                 'password': password}),
              headers:{'content-type': 'application/json'}

               }).then(function(response){
                 return response.json();
               }).then(function(data){
                 if(data["key"])
                 {
                   sessionStorage.token = data["key"];
                   console.log(sessionStorage.token);
                   axios.defaults.headers.common["Authorization"] = "Token "+ data["key"];
                   self.setState({visible:false});
                 }
                 else {
                   {
                     alert("try again!");
                   }
                 }
               });

          window.controlSocket.send(JSON.stringify({
            'token':sessionStorage.token,

          }))  ;

          window.controlSocket.onmessage = function(event){
            console.log(JSON.parse(event.data));}


  }




   render()
   {
      if(this.state.visible)
      {return(
          <Form>
          <Form.Input label='username' placeholder='enter your username' onChange={this.Change1} value={this.state.username}/>
          <Form.Input label='password' placeholder='enter your password'type='password' onChange={this.Change2}  value={this.state.password}/>

          <Form.Button onClick={() => {this.Submit()}} >Submit</Form.Button>

          </Form>
      );
    }
      else return null;


   }






  }
//AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk

export default Login;
