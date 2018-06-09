import React, { Component } from 'react';
class TrackBpm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bpm:this.props.tackBpm
            // disabled: false
        }
        this._track = this.props._track
    }
    
    render() {
        console.log(this.state.playing);
        return (
            <button className="playButton" onClick={this.handlePlayButtonClicked} >
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

        );
    }
}


export default PlayButton;
