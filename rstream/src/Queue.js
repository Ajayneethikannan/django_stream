import React from 'react';
import axios from 'axios';
import {Button, Card, Icon} from 'semantic-ui-react';
import './Queue.css';
import Player from './Player';
class Queue extends React.Component
{
  constructor(props){
    super(props);
    this.state = {songs:'',
    url:'Io0fBr1XBUA',
    playing:false,
    seek:0,
  sync:false};
    this.update = this.update.bind(this);
    this.likeSong = this.likeSong.bind(this);
    this.deleteSong = this.deleteSong.bind(this);
    this.retrieve_url = this.retrieve_url.bind(this);
    this.setRef = this.setRef.bind(this);


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
    {
        that.setState({'url':data.url});
        that.setState({'playing':data.playing});

        that.setState({'sync':true});
        that.player.seekTo(data.seek);
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
      return <div key={song.videoId}><Card key={song.videoId} image= {song.img_url} default={'https://www.google.co.in/search?q=music&tbm=isch&source=lnms&sa=X&ved=0ahUKEwjUxuGho5XcAhWOWX0KHYQzBf4Q_AUIDCgD&biw=1478&bih=666&dpr=1.3#imgrc=kt_r70gjH_cv5M:'}header={song.song_name} description={"Level = "+song.level}/>
              <Icon name='eject' onClick={() => {that.deleteSong(song.videoId)}}/><Icon name='thumbs up' onClick={()=>{that.likeSong(song.videoId)}}/>
              </div>
    })
    return <div><Player retrieve_url = {this.retrieve_url} url={this.state.url} playing={this.state.playing}  setRef={this.setRef}/><div className='song_list'>{b}</div></div>;

         }





}
export default Queue;
