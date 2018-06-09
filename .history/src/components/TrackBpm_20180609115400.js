import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/fontawesome-free-solid/'
import Sound from 'react-sound';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './PlayButton.css'
class DetailsDiv extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playing: this.props.playing,
            percentage: 0
            // disabled: false
        }
        this.songRef = this.props.songRef;
        this.playColor = this.props.playColor;
    }
    //TODO:GET VOER
    handlePlayButtonClicked = (type) => {
        this.setState({ playing: !this.state.playing })
        if (!this.songRef.mySound.sound.playState) {
            this.songRef.mySound.sound.play();

            this.songRef.setState({
                trackStatus: Sound.status.PLAYING,
                trackLoop: (type === "all" ? true : false)
            })
        } else {
            if (this.songRef.mySound.sound.paused) {
                if (type === "all" && !this.songRef.state.trackLoop) {
                    this.songRef.setState({
                        trackPosstion: this.songRef.mySound.sound.position,
                        trackVolume: this.songRef.mySound.sound.volume,
                        trackStatus: Sound.status.PLAYING,
                        trackLoop: true
                    })
                } else if (type !== "all" && this.songRef.state.trackLoop) {
                    this.songRef.setState({
                        trackPosstion: this.songRef.mySound.sound.position,
                        trackVolume: this.songRef.mySound.sound.volume,
                        trackStatus: Sound.status.PLAYING,
                        trackLoop: false
                    })
                }
                this.songRef.mySound.sound.resume();
            } else {
                this.songRef.mySound.sound.pause();
            }
        }



    }
    // enableButton = () => {
    //     console.log("enable")
    //     this.setState({ disabled: false })

    // }
    render() {
        console.log(this.state.playing);
        return (
            <button  className="playButton" onClick={this.handlePlayButtonClicked} >
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon style={{ color: this.playColor }} className='font-awesome playAwesome' icon={this.state.playing ? faPause : faPlay} />
                    <div style={{ position: '' }}>

                        <CircularProgressbar
                            textForPercentage={() => ''}
                            percentage={this.state.percentage}
                            initialAnimation={false}
                        // textForPercentage={null}
                        />
                    </div>
                </div>
            </button>
            // <div>
            //     <CircularProgressbar
            //         textForPercentage={(p) => "<div>dd</div>"}
            //         percentage={60} />
            // </div>
            // <button className="playButton" onClick={this.handlePlayButtonClicked} >
            //     <FontAwesomeIcon style={{ color: this.playColor }} className='font-awesome' icon={this.state.playing ? faPause : faPlay} />
            // </button>
        );
    }
}


export default PlayButton;
