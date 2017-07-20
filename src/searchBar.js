//import YouTube from '../node_modules/react-youtube';
import React, { Component } from 'react';
import YouTube from './youtube'
import Autocomplete  from '../node_modules/material-ui/AutoComplete';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP              from 'jsonp';
import YoutubeFinder        from 'youtube-finder';
 import injectTapEventPlugin from 'react-tap-event-plugin';
 import Lista from './Lista';
  import VideoList from './VideoList';
  import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MenuItem from 'material-ui/MenuItem';
 injectTapEventPlugin();
const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;

//var youtube = require('youtube-finder')
//var client = youtube.createClient({ key: 'YOUR_API_KEY'})

class searchBar extends React.Component {

  constructor(props) {
  super(props);

   this.state = {
      dataSource:[],
      inputValue : '',
      videosYT : {},
  };
      this.onUpdateInput = this.onUpdateInput.bind(this);
       this.onNewRequest   = this.onNewRequest.bind(this);
       this.YoutubeClient  = YoutubeFinder.createClient({ key: this.props.apiKey });
       this.onChange = this.onChange.bind(this);


}
onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }
  onNewRequest(searchTerm) {
     const
       self   = this,
       params = {
         part        : 'id,snippet',
         type        : 'video',
         q           : this.state.inputValue,
         maxResults  : '50'
       }

     this.YoutubeClient.search(params, function(error,results) {
       if(error) return console.log(error);

       self.props.busqueda(results.items,searchTerm);

       self.setState({
         dataSource : [],
         inputValue : ''
       });
     });
   }

  performSearch() {
     const
       self = this,
       url  = googleAutoSuggestURL + this.state.inputValue;

     if(this.state.inputValue !== '') {
       JSONP(url, function(error, data) {
         let searchResults, retrievedSearchTerms;

         if(error) return error;

         searchResults = data[1];

         retrievedSearchTerms = searchResults.map(function(result) {
           var valores ={
           text: result[0],
            value: (
              <list
              primaryText= {result[0]}
              leftAvatar={<Avatar src="imagenVideo.jpg" />}
              />
            )
          }

           return valores;
         });

         self.setState({
           dataSource: retrievedSearchTerms
         });
       });
     }
   }

   onChange(event){
         this.setState({inputValue: event.target.value});
         console.log(event.target.value);
         if(event.target.value.length>2){
               setTimeout(function() {
                     //console.log(event.target.value);
                           const
                              self = this,
                             params = {
                               part        : 'id,snippet',
                               type        : 'video',
                               q           : this.state.inputValue,
                               maxResults  : '15',
                               videoCategoryId:"10",
                               videoLicense:"youtube",
                             }

                           this.YoutubeClient.search(params, function(error,results) {
                             if(error) return console.log(error);
                             self.state.videosYT= results.items;

                             //self.props.busqueda(results.items,searchTerm);
                           });
                     }.bind(this), 2000);
        }
   }

modificarVideo(video){
  console.log("legue2");
    console.log(video);
    this.props.busqueda(video);


}


  render(){
    console.log(this.state.videosYT);
    const dataSourceConfig = {
  text: 'text',
  value: 'value',
};
      return(
        <div>

           <input type="text" onChange={this.onChange.bind(this)} value={this.state.inputValue} />

           <VideoList videos={this.state.videosYT} mandar2={this.modificarVideo.bind(this)} cerrarModal={this.props.cerrarModal}  cambiarVideo={this.props.cambiarVideo} cambiarLista={this.props.cambiarLista} />

        </div>

      );
  //<button type="button" onClick={this.props.cambiar.bind(this,"Fltqv-TKbFY")}>Click Me!</button>
//ReactDOM.render(<YouTube video="o_l4Ab5FRwM" />, document.getElementById('root'));

  }
}

export default searchBar ;
