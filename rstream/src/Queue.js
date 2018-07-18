import React from 'react';
import axios from 'axios';
import {Button, Card, Icon} from 'semantic-ui-react';
import './Queue.css';
import './index.css';
import Player from './Player';
import Slide from 'react-reveal/Slide';
import YoutubeSearch from './YoutubeSearch';
import UserControl from './UserControl';
class Queue extends React.Component
{
  constructor(props){
    super(props);
    this.state = {songs:'',
    url:'Io0fBr1XBUA',
    playing:false,
    seek:0,
    sync:false,
    show_search:false,
    show_queue:true,
    show_user:false};
    this.update = this.update.bind(this);
    this.likeSong = this.likeSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.retrieve_url = this.retrieve_url.bind(this);
    this.setRef = this.setRef.bind(this);
    this.show_search = this.show_search.bind(this);
    this.show_queue = this.show_queue.bind(this);
    this.show_user = this.show_user.bind(this);


  }
  show_search()
  {
    this.setState({show_search:!this.state.show_search});
  }
  show_queue(){
    this.setState({show_queue:!this.state.show_queue});
  }
  show_user()
  {
    this.setState({show_user:!this.state.show_user});
  }

 retrieve_url()
 { if(this.state.songs != '')
   {return this.state.songs[0].videoId;}
   else return null;
 }
  update()
  {
    let that = this;
    axios.get('http://127.0.0.1:8000/control/').then(
      function(response){
        console.log(response.data);
        that.setState({'songs':response.data});
      }
    );


  }
  likeSong(id)
  {
    axios.post('http://127.0.0.1:8000/control/',
        {
          'videoId':id,
        });

  }
  deleteSong(id)
  {
    var a = 'http://127.0.0.1:8000/delete/'+id+'/';
    axios.delete(a);
  }



  componentDidMount()
  {

   this.update();
   let that = this;



    window.controlSocket.addEventListener("message", function(event){
    const data = JSON.parse(event.data);
    console.log(data);




    if(data.control === 'update' ){

        that.update();


    }
    else if(data.scontrol)
    {  that.player.seekTo(data.seek);
        that.setState({'url':data.url});
        that.setState({'playing':data.playing});

        that.setState({'sync':true});

    }
    else if(data.sync_request)
    {   if(that.state.sync == true){
        const num = that.player.getCurrentTime()/that.player.getDuration();
        window.controlSocket.send(JSON.stringify({
          'scontrol':true,
          'seek':num,
          'url':that.state.url,
          'playing':that.state.playing,
        }));
      }
    }
      else if(data.sync_request_url)
      {if(that.state.sync == true)
        window.controlSocket.send(JSON.stringify({'request_url':that.state.url}));
      }
      else if(data.request_url)
      {if(that.state.sync == false)
        that.setState({url:data.request_url,
                        playing:true});
      }



}
);




  }
  setRef(ref)
  {
    this.player = ref;
  }

  render()
  {

    let that = this;
    const songs = Array.from(this.state.songs);
    const b = songs.map(function(song){
      return <div key={song.videoId} className="song">
      <div className="list_item">
             <img src={song.img_url}/>

             <h3>{song.song_name}</h3>
      </div>



              <div className="song-update">
              <Icon name='thumbs up' onClick={()=>{that.likeSong(song.videoId)}}/>
              <h4>Pref-Level = {song.level}</h4>
              <Icon name='eject' onClick={() => {that.deleteSong(song.videoId)}}/>
              </div>
              </div>
    });

    const a  = (this.state.show_user)?"user-control2" :"user-control1";
    return <div>
    <Slide left collapse when={this.state.show_search}><YoutubeSearch/></Slide>
    <div className={a}><UserControl Logout = {this.props.Logout}/></div>

    <div className = 'logout'>
    <Icon name="angle left"  size="huge" onClick={this.show_search}/>
    <Icon name="angle down" size="huge" onClick={this.show_user} />
    <Icon name="angle right" size="huge" onClick={this.show_queue}/ ></div>
    <Player retrieve_url = {this.retrieve_url} url={this.state.url} playing={this.state.playing}  setRef={this.setRef}/>
    <Slide right collapse when={this.state.show_queue}><div className='song_list'><h1>Queue</h1>{b}</div></Slide>
    </div>;

         }





}
export default Queue;
