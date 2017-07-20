import React, { Component } from 'react';

class ImagenVideo extends React.Component {
      constructor(props){
        super(props)

     }
    render() {
        return (
        <figure className="media-left">
          <img className="media-object"  src={this.props.picture} />
        </figure>
      )
    }
}

export default ImagenVideo;
