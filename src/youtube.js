import YouTube from '../node_modules/react-youtube';
import React, { Component } from 'react';
import SearchBar from "./searchBar"
import {Provider} from "react-redux";
import {connect} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";

class youtube extends React.Component {



  render() {
    console.log(this.props.vid);
    console.log("adadadaadadad");
    console.log(this.props.mandarVideo);
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      },
    };

    return (
      <div>
            <div>
                <YouTube
                  videoId={this.props.vid}
                  opts={opts}
                  onReady={this.onReady.bind(this)}
                  onEnd={this.onChangeVideo.bind(this)}
                //  onPause={this.onChangeVideo}
            />
          </div>


      </div>
    );
  }
  onReady(event) {
    this.setState({
   player: event.target,
 });

  // access to player in all event handlers via event.target
}

onChangeVideo(event) {
var turno="";
this.props.ListaReproduccion.forEach((video,index,lista)=>{
  console.log(index);
  console.log(this.props.ListaReproduccion.length);
      if(video.id.videoId==this.props.vid && index<this.props.ListaReproduccion.length-1){
        console.log("el turno if");
        console.log(lista[index+1]);
        turno= lista[index+1].id.videoId;
        console.log(turno);
      }
  });
  console.log("el turno");
  console.log(turno);
  if(turno!=""){
this.props.cambiarVideo(turno);}

  //  this.state.player.playVideo();
// event.target.playVideo()
}

cambiarVideo(video){
  this.setState({
      videoId: video
    });

}

yourCallback(searchResults) {
  console.log('searchResults are: ', searchResults);
  this.setState({
      videoId: searchResults
    });
}
}



export default youtube;
