import React from 'react';
import searchYoutube from 'youtube-api-search';
import {Icon, Input, Card} from 'semantic-ui-react';
import axios from 'axios';
import Slide from 'react-reveal/Slide';
class YoutubeSearch extends React.Component{

  constructor(props)
  {
    super(props);
    this.state = {
                   results:''};
    this.Submit = this.Submit.bind(this);
    this.addSong = this.addSong.bind(this);


  }
  addSong(video)
  {
    axios.post('http://127.0.0.1:8000/control/',
    {
      'videoId':video.id.videoId,
      'img_url':video.snippet.thumbnails.default.url,
      'song_name':video.snippet.title,
    }).then(function(response){
      console.log(response.data);
    })

  }
  Submit(value){
    let self = this;
    const term = value;
    searchYoutube({key:'AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk',term:term,maxVideos:10},
    (videos) => {self.setState({results:videos});console.log(videos)});


  }
  render(){

   return (
     <Slide left>
     <div>
     <SearchBar Submit = {this.Submit}/>
     <Results results={this.state.results} addSong = {this.addSong}/>
     </div>
   </Slide>);


  }

}

class SearchBar extends React.Component
{


  constructor(props)
  {
    super(props);
    this.state = {term:'hello'};

    this.Change = this.Change.bind(this);
    this.Click = this.Click.bind(this);
  }
  Change(event){

    this.setState({term : event.target.value});
    console.log(this.state.term);

  }
 Click()
 {
   this.props.Submit(this.state.term);
 }
  render()
  {

    return (
      <Input className="search" icon={<Icon name='search' inverted circular link onClick={this.Click}/>} value = {this.state.term} onChange={this.Change} placeholder="enter video name"/>
    );


  }

}
class Results extends React.Component
{
constructor(props){
  super(props);

  this.loadResults = this.loadResults.bind(this);
}
loadResults()
{

    const  a = Array.from(this.props.results);
    console.log(a);
    let that = this;
    const style = {border:'2px white solid'};
    const b = a.map(function(video)  {return(
      <div className="list_song" key={video.id.videoId} onClick={()=>{this.props.addSong(video)}}>
      <img src={video.snippet.thumbnails.default.url}/>
      <h4>{video.snippet.title}</h4>


     </div>



   );}.bind(this));
      return b;


}
render()
{
  const a = this.loadResults();
   return a;

}


}

export default YoutubeSearch;
