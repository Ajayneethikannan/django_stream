import React from 'react';
import ReactPlayer from 'react-player';
import {Button, Input} from 'semantic-ui-react';
import axios from 'axios';

class Player extends React.Component {

    constructor(props){
      super(props);
      this.scontrol = this.scontrol.bind(this);
      this.icontrol = this.icontrol.bind(this);
      this.seekChange = this.seekChange.bind(this);
      this.next = this.next.bind(this);
      this.onProgress = this.onProgress.bind(this);
      this.full_sync = this.full_sync.bind(this);
      this.controlSocket = window.controlSocket;
      this.state  = {
        url:"http://www.youtube.com/watch?v=Io0fBr1XBUA",
        playing: false,
        volume:0.5,
        value:0,
        muted: false,
        loop: false,
        duration: 0,
        played:0,
        url_sync:false,
        full_sync:false,




      }


    }

   componentDidUpdate()
   {if(this.state.url_sync == false)
     {window.controlSocket.send(JSON.stringify({
       'sync_request_url':true,
     }));
    this.setState({url_sync:true,})}

 }
 full_sync()
 {
   if(!this.state.full_sync && this.state.url_sync)
   {
     setTimeout(function(){window.controlSocket.send(JSON.stringify({'sync_request':true}));
     this.setState({full_sync:true});}.bind(this),
        8000);

   }
 }

/* how demand for next song should be done,
tcontrol - nextSong
scontrol - play, pause, seek  */
    next(event)
    {const videoId = this.props.retrieve_url();
      if(videoId != null)
      window.controlSocket.send(JSON.stringify({'next':videoId}));

    }


    seekChange(event){
      if(event.target.id == 'volume')
      this.setState({'volume':parseFloat(event.target.value)});
      else {
        this.setState({played:event.target.value});
      }

    }


    scontrol(event)  //simple controls
    {
      var a = {'scontrol':true,};
      if(event.target.id == 'play'){
        a['playing'] = !this.props.playing;
        a['seek'] = this.state.played;
        a['url'] = this.props.url;
      }
      else {
        a['playing'] = this.props.playing;
        a['seek'] = this.state.played;
        a['url'] = this.props.url;
      }
      window.controlSocket.send(JSON.stringify(a));


    }

    onProgress = (state) =>
    {
      this.setState({played:state.played});
    }

    icontrol(event) //individual controlS
    {
      const key = event.target.id;
      switch(key)
      {
      case 'volume':
      const value = event.target.value;
      this.setState({key:value});

      case 'muted':
      this.setState({muted:!this.state.muted});
     }


    }

    render()
    {

      const {volume,value,muted,loop,duration} = this.state;
      const played = this.state.played;
      const playing = this.props.playing;
      const url = "http://www.youtube.com/watch?v=" + this.props.url;



      return (<div>
        <Button id='play' onClick={this.scontrol}>{!playing ? 'Play' : 'Pause'}</Button>
        <Button id='muted' onClick={this.icontrol}>MUTE</Button>
        <Button id='next' onClick={this.next}>NEXT</Button>
        <Button id='sync' onClick={this.sync}>MANUAL SYNC</Button>
        <input type='range' min={0} max={1} value={volume} id="volume" step={0.01} onChange={this.seekChange} />
        <input type='range' min={0} max={1} value={played} id="seek" step={0.01} onChange={this.seekChange} onMouseUp={this.scontrol} />


        <ReactPlayer
        id = 'player'
        ref = {this.props.setRef}
        url = {url}
        playing = {playing}
        volume = {volume}
        muted = {muted}
        onEnded = {this.next}
        onProgress = {this.onProgress}
        style={{'pointerEvents':'none'}}
        onReady = {this.full_sync}/>

        </div>) ;
    }


}

export default Player;
