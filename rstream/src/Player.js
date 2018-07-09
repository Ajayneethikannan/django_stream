import React from 'react';
import ReactPlayer from 'react-player';
import {Button} from 'semantic-ui-react';
import axios from 'axios';
class Player extends React.Component {

    constructor(props){
      super(props);
      this.scontrol = this.scontrol.bind(this);
      this.icontrol = this.icontrol.bind(this);
      this.controlSocket = window.controlSocket;
      this.state  = {
        url:'',


      }

    }
    componentDidMount()
    {
        this.controlSocket.onmessage = function(event){
         let data  = JSON.parse(event.data);




        }
    }

    scontrol(event)  //simple controls
    {
      const value =  event.target.id;
      console.log(value);
      this.controlSocket.send(JSON.stringify({scontrol:value,}));

    }

    icontrol(event) //individual controlS
    {
      axios.post('http://127.0.0.1:8000/control/',
        {
          'videoId':'loo',
          'img_url':'lol',
          'song_name':'lol',

        }).then
      (function(response) {
    console.log(response.data);
  }).then(

            axios.delete('http://127.0.0.1:8000/delete/loo/').then(
              function(response){
                console.log(response.data);
              }));



    }
    ref = (player) => {
      this.player  =  player;
    }
    render()
    {
      return (<div>
        <Button id="play" onClick={(event)=>this.scontrol(event)}>PLAY</Button>
        <Button id="pause" onClick={(event)=>this.scontrol(event)}>PAUSE</Button>
        <Button id="mute" onClick={(event)=>this.icontrol(event)}>MUTE</Button>

        <ReactPlayer
        ref = {this.ref}
        url = "http://www.youtube.com/watch?v=Io0fBr1XBUA"
        playing = {true}/>
        </div>) ;
    }


}

export default Player;
