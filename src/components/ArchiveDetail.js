import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { CreditList } from './'
import { Modal, VideoPlayer, ScrollToTopOnMount, Spinner } from './'




export class ArchiveDetail extends React.Component {

    state = {
        modalVisible: false,
        videoPlaying: false
    }

    componentDidMount(){
        const { fetchById, match } = this.props
        fetchById(match.params.id)
    }

    render() {

        const {
            archiveById,
            archiveId,
            match,
            client,
            categories,
            requestingById
        } = this.props

        if(requestingById) return <Spinner classes={`spinner-screen ${requestingById ? 'visible' : ''}`} />

        return <div className="edit-archive-container">
                    <ScrollToTopOnMount />
                    <Modal
                        onCloseClick={() =>
                            this.setState({
                                modalVisible: false,
                                videoPlaying: false
                            })}
                        classes={ `modal modal-video ${!this.state.modalVisible ? 'hidden' : '' }`}>
                        <VideoPlayer
                            videoPlaying={this.state.videoPlaying}
                            src={`${process.env.REACT_APP_API_URL}${archiveById._links.video.href}?token=${client.token}`}
                        />
                    </Modal>
                    <div className="content">
                        <div className="media-container">
                            <div className="video-overlay video-play" onClick={() =>
                                        this.setState({
                                            modalVisible: !this.state.modalVisible,
                                            videoPlaying: true
                                        })}>
                                <span className="mill-icons_play"></span>
                            </div>
                            <img
                                alt="Stream"
                                className="archive-video-thumbnail"
                                src={`${process.env.REACT_APP_API_URL}${archiveById._links.thumbnail.href}?token=${client.token}`}
                            />
                        </div>

                        <div className="field">
                            <h3>Title</h3>
                            <p>{archiveById.name}</p>
                        </div>

                        <div className="field">
                            <h3>Brand</h3>
                            <p>{archiveById.brand}</p>
                        </div>

                        <div className="field">
                            <h3>Intro</h3>
                            <p>{archiveById.intro}</p>
                        </div>

                        <div className="field">
                            <h3>Summary</h3>
                            <p>{archiveById.summary}</p>
                        </div>

                        <div className="field">
                            <h3>Date</h3>
                            <p>{archiveById.created_at}</p>
                        </div>

                        <div className="field">
                            <h3>Files</h3>
                            <p>Files go here</p>
                             {/* TODO: update files to be dynamic */}
                        </div>

                        <div className="field">
                            <h3>Beam ID</h3>
                            <p>{archiveById.id}</p>
                        </div>

                    </div>

                    <div className="sidebar">

                        <div className="edit-button-container">
                            <Link to={`/archives/${match.params.id}/edit`}>
                                <button id="editArchiveBtn" className="default-btn white-btn cancel" type="button" name="button">Edit</button>
                            </Link>
                        </div>

                        <div className="ipad-push-container">
                            <h3 className="section-title">Available on iPad</h3>
                            <div className={`boolean-icon enabled_${archiveById.enabled || false}`}></div>
                        </div>

                        <div className="url">
                            <h3 className="section-title">Share Url</h3>
                            <p className="content-preview">{archiveById.article_url}</p>
                        </div>

                        <div className="categories">
                            <h3 className="section-title">Categories</h3>
                            <p>
                                {
                                    archiveById.categories.map((category, index) => {
                                        return <span key={index}>
                                            {category.name}
                                            {index !== archiveById.categories.length - 1 ? ', ' : ''}
                                        </span>
                                    })
                                }
                            </p>
                        </div>

                        <CreditList credits={archiveById.credits}></CreditList>

                    </div>

                </div>;
    }
}

ArchiveDetail.PropTypes = {
    archiveById: React.PropTypes.object.isRequired,
    fetchById: React.PropTypes.func.isRequired
}
