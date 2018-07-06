import React from 'react';


class Player extends React.Component {

    constructor(props){
      super(props);
      this.check = this.check.bind(this);
      this.controlSocket = new WebSocket('ws://127.0.0.1:8000/ws/control/');

    }

    check(){
      console.log(sessionStorage.token);
      this.controlSocket.send(JSON.stringify({'token': sessionStorage.token}));
      this.controlSocket.onmessage = function(event)
      {
        console.log(JSON.parse(event.data));

      }
    }

    render()
    {
      return <button onClick = {()=> this.check()}>Check</button> ;
    }


}

export default Player;
