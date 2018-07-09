import React from 'react';
import searchYoutube from 'youtube-api-search';
import {Icon, Input, Card} from 'semantic-ui-react';

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
    searchYoutube({key:'AIzaSyAN-0-1obttU_sT7iopxfWjnUtri6eSmFk',term:term,maxVideos:10},
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
    const style = {border:'10px tomato solid'};
    const b = a.map(function(video)  {return(
     <Card key={video.id.videoId} id={video.id.videoId} onClick={()=>{this.props.addSong(video)}} style={style} image ={video.snippet.thumbnails.default.url} header = {video.snippet.title} description = {video.snippet.description}/>




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
