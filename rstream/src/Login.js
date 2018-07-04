import React, { Component } from 'react';
import './Login.css';
import {Form} from 'semantic-ui-react';



class Login extends Component {
  constructor(props)
   {
     super(props);
     this.state = {username:'',
                   password:''};
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
                 //do something
               });



  }




   render()
   {

      return(
          <Form>
          <Form.Input label='username' placeholder='enter your username' onChange={this.Change1} value={this.state.username}/>
          <Form.Input label='password' placeholder='enter your password'type='password' onChange={this.Change2}  value={this.state.password}/>

          <Form.Button onClick={this.Submit} >Submit</Form.Button>

          </Form>
      );


   }






  }
//AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk

export default Login;
