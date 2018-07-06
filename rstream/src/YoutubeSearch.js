import React from 'react';
import searchYoutube from 'youtube-api-search';
import {Icon, Input} from 'semantic-ui-react';

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
    console.log(video);

  }
  Submit(value){
    let self = this;
    const term = value;
    searchYoutube({key:'AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk',term:term,maxVideos:5},
    (videos) => {self.setState({results:videos});console.log(videos)});
    

  }
  render(){

   return (<div>
     <SearchBar Submit = {this.Submit}/>
     <Results results={this.state.results} addSong = {this.addSong}/>
     </div>);


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
      <Input icon={<Icon name='search' inverted circular link onClick={this.Click}/>} value = {this.state.term} onChange={this.Change} placeholder="enter video name"/>
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
    const style = {border:'5px tomato solid',};
    const b = a.map(function(video)  {return(
     <div key={video.id.videoId} id={video.id.videoId} onClick={this.props.addSong()} style={style} >
     <img src={video.snippet.thumbnails.default.url} onClick={() => {that.props.addSong(video)}}/>
       <p><b>{video.snippet.title}</b></p>
       <p>{video.snippet.description}</p>


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
