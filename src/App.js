import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './modal.css';
import YouTube from './youtube'
import SearchBar from "./searchBar"
import YoutubeComponent from "./YoutubeComponent"
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {connect} from "react-redux";
import Modal from 'react-modal';
import ListaReproduccion from "./ListaReproduccion"
import Pubnub from 'pubnub';

const publish_key =  'pub-c-30d9e07d-22db-4ca2-9d1d-9456b6310710'; // your pub key
const subscribe_key  = 'sub-c-aec3263e-6981-11e7-9bf2-0619f8945a4f'; // your sub key

const PubNub = require('pubnub');

const pubnub= new PubNub({
  publish_key   : publish_key,
  subscribe_key : subscribe_key,
  ssl: true,
  uuid: Math.random()
});

const channel = 'videos';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      VideoActual:" ",
      listaVideos: [],
      turnoReproducir:0
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  connect() {
  pubnub.history({
    channel: "canal1",
    count: 1,
    callback: (m) => {
      console.log("recivi");
    },
    success:(m)=>{
      console.log("llego el mensaje");
      let arrayvar = this.state.listaVideos.slice()
        arrayvar.push(m)
        this.setState({listaVideos: arrayvar});
    }

  });
}


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    console.log("cerrarrrrrrr");
  }

  cambiarDevideo(video){
    this.setState({
      VideoActual:video
    })

  }
  agregarLista(videoNuevo){
    ////////agregar video a la lista
    videoNuevo.turno=this.state.turnoReproducir+1;
      var arrayvar = this.state.listaVideos.slice()
      arrayvar.push(videoNuevo)
    ///////////////////////////////////
    this.setState({
      listaVideos: arrayvar
    });
    var turno = this.state.turnoReproducir+1;
    if(this.state.VideoActual==" "){
      this.setState({
        VideoActual:videoNuevo.id.videoId
      });
      this.setState({
        turnoReproducir:turno
      });
    }
    pubnub.publish({
    channel: "canal1",
    message: videoNuevo,
    callback: console.log("fafsafsafsafsafsafsafsafsa")
});
    console.log(this.state.turnoReproducir);

  }

  render() {
    return (
      <div className="App">
      <div className="container">
          <YouTube vid={this.state.VideoActual} ListaReproduccion={this.state.listaVideos} cambiarVideo={this.cambiarDevideo.bind(this)} />
        </div>
        <br/>
        <div className="container">
            <ListaReproduccion videos={this.state.listaVideos} cambiarVideo={this.cambiarDevideo.bind(this)}/>
        </div>

        <div>
                      <button className="btn btn-info btn-lg" onClick={this.openModal}>Buscar Video</button>
                      <Modal
                      className="Modal__Bootstrap modal-dialog"
                      closeTimeoutMS={150}
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      >
                      <div className="modal-content" >
                       <div className="modal-header">
                         <button type="button" className="close" onClick={this.closeModal}>
                           <span aria-hidden="true">&times;</span>
                           <span className="sr-only">Close</span>
                         </button>
                         <h4 className="modal-title">Agregar video a la lista</h4>
                       </div>
                       <div className="modal-body">
                          <SearchBar apiKey='AIzaSyD1Wkp0IqRnn8WVSZDYRlTotC8iMMZKI20' cambiarVideo={this.cambiarDevideo.bind(this)} cerrarModal={this.closeModal.bind(this)} cambiarLista={this.agregarLista.bind(this)}/>
                       </div>
                       <div className="modal-footer">
                         <button type="button" className="btn btn-default" onClick={this.closeModal}>Close</button>
                       </div>
                      </div>
                      </Modal>
        </div>



      </div>
    );
  }
}


export default App;
