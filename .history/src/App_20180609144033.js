import React, { Component } from 'react';
import Header from './components/Header'
import TrackList from './components/TrackList'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  addTrack = (trackIndex) => {
    // add track to avtive track list
    this._trackList.addTrack(trackIndex);
  }

  playAllTracks = () => {
    this._trackList.playAllTracks();
  }

  stopAllTracks = () => {
    this._trackList.stopAllTracks();
  }


  syncAllTracks = () => {
    this._trackList.syncAllTracks();
  }

  removeTrack = (trackIndex) => {
    // remove track from selection list
    this._header.removeTrack(trackIndex);
  }

  render() {

    return (
      <div className="App">
        {/* top control buttons */}
        <Header ref={_component => this._header = _component} _App={this} />
        
        {/* track list */}
        <TrackList ref={_component => this._trackList = _component} _App={this} />
      </div>

    );
  }
}

export default App;
