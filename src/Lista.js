//import YouTube from '../node_modules/react-youtube';
import React, { Component } from 'react';
import YouTube from './youtube'
import Autocomplete  from '../node_modules/material-ui/AutoComplete';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP              from 'jsonp';
import YoutubeFinder        from 'youtube-finder';
 import injectTapEventPlugin from 'react-tap-event-plugin';



class Lista extends React.Component {

  constructor(props) {
  super(props);



}

  render()
    {

      if(this.props.videos.length>0){
        var createItem = function(itemText, index)
        {
          if(index<5)
            return <li key={index + itemText.id.videoId}>{itemText.id.videoId}</li>;
        };
        console.log("ffffffffffffffffffffffffffffffffffff");
        //  console.log(this.props.videos[0].id);
          console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return <div><ul> {this.props.videos.map(createItem)}</ul></div>;
      }
      else {
        return null
      }
    }
}

export default Lista;
