import React from 'react'
import ImagenVideo from './ImagenVideo'
import { connect } from 'react-redux';

class VideoRow extends React.Component {
  constructor(props){
    super(props)

 }
mostrarVideo(event){
//this.props.cambiarVideo(event);
console.log(this.props.listaFlag);
if(this.props.listaFlag==false){
  this.props.cerrarModal();
  this.props.cambiarLista(this.props.ObjetoVideo);
}
else{
this.props.cambiarVideo(event);

}


}
  render() {
    return(
      <li className="media" onClick={this.mostrarVideo.bind(this,this.props.video)}>
        <ImagenVideo picture={this.props.picture} />
        <div className="media-body">
        <br/>
          <h4 className="media-heading">
            {this.props.title} &nbsp;
          </h4>
            <h4 className="media-heading glyphicon glyphicon-remove"></h4>
        </div>
        <hr/>
      </li>
    )
  }
}

export default VideoRow
