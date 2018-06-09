import React, { Component } from 'react';
import Track from './Track'
import data from '../data'
import colors from '../colors'
class TrackList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTrackIndexList: [],
        }
        // a list of all sound reference
        this._trackRefs = [];
        // reference to main app (comunicate with the header component)
        this._App = props._App;
        this.intervalCheckTracksLoaded = null;
    }

    addTrack = (trackIndex) => {
        const activeTrackIndexList = this.state.activeTrackIndexList;
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
        // refernce to this trackList from async function (intervalCheckTracksLoaded)
        activeTrackIndexList.map((trackIndex) => {
            if (this._trackRefs[trackIndex].state && this._trackRefs[trackIndex].state.trackLoaded)
                return this._trackRefs[trackIndex].playTrack();
            else
                return 0;
        })
    }

    stopAllTracks = () => {
        // clear check interval in case there is one
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
