import React from 'react';
import ReactPlayer from 'react-player';
import {Button, Input, Icon} from 'semantic-ui-react';
import axios from 'axios';
import {Slider} from 'react-semantic-ui-range';

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
        seeking:false,




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
      console.log(videoId);
      if(videoId != null)
      window.controlSocket.send(JSON.stringify({'next':videoId}));

    }



    seekChange(event){
      if(event.target.id == 'volume')
      this.setState({'volume':parseFloat(event.target.value)});
      else {
        this.setState({seeking:true});
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
      this.setState({seeking:false});


    }

    onProgress = (state) =>
    { if(this.state.seeking == false)
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
      var name = '';
      var vol_name ='';
      if(this.state.muted == false)
         vol_name='volume off';
      else {
        vol_name = 'volume up';
      }
      if(this.props.playing == true)
              {name = 'pause';}
      else
      {name = 'play';
    }

      return (<div>
        <div>

        <div className="controller">
        <div className="seeker">
        <div className="scontrol">
        <Icon name={vol_name} size='large' id='muted' onClick={this.icontrol}/ >
        <Icon id='play' size='large' name={name} color='white' onClick={this.scontrol}/>
        <Icon name='step forward' size='large' id='next' onClick={this.next}/></div>

        <div><Slider style = {{width:'15vw'}} color = 'teal' inverted = {false} settings={{min:0,
                           max:1,
                           start:this.state.volume,
                           step:0.05,

                          onChange:(value)=>{this.setState({'volume':value})}}}/>
                          </div></div>

        <div className="seeker"><input type='range' min={0} max={1} value={played} id="seek" step={0.01} onChange={this.seekChange} onMouseUp={this.scontrol} />
         </div>
         <Button id='sync' onClick={this.sync}>manual sync</Button>
         </div></div>
        <div id="player">
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
        onReady = {this.full_sync}
        progressInterval = {250}
        />
        </div>

        </div>) ;
    }


}

export default Player;
