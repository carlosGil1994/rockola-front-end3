import React from 'react'
import VideoRow from './VideoRow'

class ListaReproduccion extends React.Component {
  constructor(props){
    super(props)
    this.modificar=this.modificar.bind(this);
 }
modificar(video){
  console.log("llegue");
    console.log(video);
this.props.mandar2(video);
}
  render() {

    if(this.props.videos.length>0){
      console.log("coloooooooooooooooooooooooooooooooooooodd");
        console.log(this.props.videos);
    return (
      <ul className="media-list Scroll-media">
        {
          this.props.videos.map((video) => {
            return <VideoRow key={ video.id.videoId }
                                picture={ video.snippet.thumbnails.medium.url}
                                title={ video.snippet.title }
                                video={video.id.videoId}
                                mandar1={this.modificar.bind(this)}
                                listaFlag={true}
                                cambiarVideo={this.props.cambiarVideo}
                             />
          })
        }
      </ul>
    )
  }
  else {
    return null;
  }
  }
}

export default ListaReproduccion;
