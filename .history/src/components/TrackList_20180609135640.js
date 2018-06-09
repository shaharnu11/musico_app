import React, { Component } from 'react';
import './TrackList.css';
import Track from './Track'
import data from '../data'
import colors from '../colors'
class TrackList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTrackIndexList: [0],
        }
        this._trackRefs = [];
        this._App = props._App;
        this.intervalCheckTracksLoaded = null;
    }

    addTrack = (trackIndex) => {
        const activeTrackIndexList = this.state.activeTrackIndexList;

        // // save the state of all the active tracks
        // activeTrackIndexList.map((trackIndex) => {
        //     return this._trackRefs[trackIndex].saveState();
        // })

        activeTrackIndexList.push(trackIndex);
        this.setState({ activeTrackIndexList })

    }
    removeTrack = (trackIndex) => {
        this._App.removeTrack(trackIndex);
        const activeTrackIndexList = this.state.activeTrackIndexList;
        // remove trackIndex from active track list
        activeTrackIndexList.splice(activeTrackIndexList.indexOf(trackIndex), 1);
        this.setState({ activeTrackIndexList })
    }

    playAllTracks = () => {
        const activeTrackIndexList = this.state.activeTrackIndexList;
        const _this = this;
        // check (loop) that all tracks are loaded and play them
        this.intervalCheckTracksLoaded = setInterval(function () {
            const allTracksLoaded = activeTrackIndexList.every((tractIndex) => {
                return (_this._trackRefs[tractIndex].state && _this._trackRefs[tractIndex].state.trackLoaded)
            })
            if (allTracksLoaded) {
                activeTrackIndexList.map((trackIndex) => {
                    return _this._trackRefs[trackIndex].playTrack();
                })
                clearTimeout(_this.intervalCheckTracksLoaded);
            }
        }, 200);
    }

    stopAllTracks = () => {
        if (this.intervalCheckTracksLoaded)
            clearTimeout(this.intervalCheckTracksLoaded);

        this.state.activeTrackIndexList.map((trackIndex) => {
            return this._trackRefs[trackIndex].resetTrack();
        })
    }

    syncAllTracks = () => {
        const activeTrackIndexList = this.state.activeTrackIndexList;
        if (activeTrackIndexList.length > 0) {

            // sort tracks by leader bpm
            activeTrackIndexList.sort((firstTrackIndex, secondTrackIndex) => {
                return data[firstTrackIndex].json.bpm < data[secondTrackIndex].json.bpm
            })
            const leadTrackIndex = activeTrackIndexList[0];
            const maxBpm = data[leadTrackIndex].json.bpm;

            // set tracks bpm to lead track bpm
            activeTrackIndexList.map((trackIndex) => {
                if (this._trackRefs[trackIndex].state.trackLoaded)
                    return this._trackRefs[trackIndex]._playerView.setState({ newBpm: maxBpm });
                else
                    return 0;
            })
            this.setState({ activeTrackIndexList })
        }
    }

    render() {

        const activeTracks = this.state.activeTrackIndexList.map((trackIndex, index) => {
            const trackDetails = data[trackIndex].json;
            return (
                <Track ref={_trackRef => this._trackRefs[trackIndex] = _trackRef}
                    _trackList={this}
                    playColor={colors[index]}
                    key={trackIndex}
                    trackDetails={trackDetails}
                    trackIndex={trackIndex} />
            )
        });
        return (
            <div>{activeTracks}</div>
        );
    }
}


export default TrackList;
