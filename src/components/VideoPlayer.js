import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'

export class VideoPlayer extends React.Component {
    componentDidUpdate() {
        const { videoPlaying } = this.props
        const video = ReactDOM.findDOMNode(this.refs.video)
        video.load()
        videoPlaying ? video.play() : video.pause()
    }
    render() {
        const {src} = this.props
        return <div className="video-container">
                    <video ref="video" width="512" height="281" controls>
                      <source src={ src } type="video/mp4" />
                    </video>
                </div>
    }
}
