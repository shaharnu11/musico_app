import React, { Component } from 'react';
import './Header.css';
import logo from '../logo.svg';
import data from '../data'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            syncButtonHover: false,
            playButtonHover: false,
            playingAll: false,
            removedTrackList: [],
            allTracks: data.map((tack) => {
                return { label: tack.json.owner + " - " + tack.json.songName, value: tack.index }
            })
        }
        this.dropDownValue = 'Select Track';
        this._App = props._App;
    }

    // handle mouse over buttons
    mouseOver = (button) => {
        if (button === "sync")
            this.setState({ syncButtonHover: true })
        else
            this.setState({ playButtonHover: true })
    }

    mouseOut = (button) => {
        if (button === "sync")
            this.setState({ syncButtonHover: false })
        else
            this.setState({ playButtonHover: false })

    }
    handlePlayAllClick = () => {
        if (this.state.playingAll) {
            this._App.stopAllTracks();
            this.setState({ playingAll: false })
        } else {
            this._App.playAllTracks();
            this.setState({ playingAll: true })
        }
    }

    handleSyncClick = () => {
        this._App.syncAllTracks();
    }

    handleDropDownChange = (change) => {
        // add new track to trackList and removedTrackList
        this._App.addTrack(change.value);
        const removedTrackList = this.state.removedTrackList;
        removedTrackList.push(change.value);
        const allTracks = data.filter((track) => !removedTrackList.includes(track.index))
            .map((track) => {
                return { label: track.json.owner + " - " + track.json.songName, value: track.index }
            })
        this.setState({ allTracks, removedTrackList,dropDownValue:this.state.dropDownValue})
    }

    removeTrack = (trackIndex) => {
        // add track to allTracks list and remove it from removedTrackList
        const removedTrackList = this.state.removedTrackList.filter((trackRemovedIndex) => {
            return trackRemovedIndex !== trackIndex
        })
        const allTracks = data.filter((track) => {
            return !removedTrackList.includes(track.index)
        })
            .map((track) => {
                return {
                    label: track.json.owner + " - " + track.json.songName,
                    value: track.index
                }
            })
        // update allTracks and removedTrackList and playAll button in case no active tracks are left
        this.setState({ allTracks, removedTrackList ,playingAll:(this.state.playingAll && removedTrackList.length === 0 ? false : this.state.playingAll)})
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>
                    <button
                        className={this.state.syncButtonHover ? "headerButton headerButtonHover" : "headerButton"}
                        onClick={this.handleSyncClick}
                        onMouseOver={() => this.mouseOver("sync")}
                        onMouseOut={() => this.mouseOut("sync")}>
                        SYNC
                    </button>
                    <button
                        className={this.state.playButtonHover ? "headerButton headerButtonHover" : "headerButton"}
                        onClick={this.handlePlayAllClick}
                        onMouseOver={() => this.mouseOver("play")}
                        onMouseOut={() => this.mouseOut("play")}>
                        {this.state.playingAll ? "STOP" : "PLAY"}
                    </button>


                </div>
                <Dropdown value={this.dropDownValue}
                    controlClassName={'dropDownControl'}
                    options={this.state.allTracks}
                    onChange={this.handleDropDownChange}
                    placeholder={this.state.dropDownValue} />
            </header>

        );
    }
}


export default Header;
