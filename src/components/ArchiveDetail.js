import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Img from 'react-image'

import { archiveRequestById } from '../modules/archives/actions'

import { CreditList } from './'
import { Modal, VideoPlayer, ScrollToTopOnMount, Spinner } from './'


class ArchiveDetail extends React.Component {

    state = {
        modalVisible: false,
        videoPlaying: false
    }

    componentDidMount(){
        const { fetchById, match } = this.props
        this.fetchById(match.params.id)
    }

    fetchById = (id) => {
        const {client, archiveRequestById} = this.props
        if (client && client.token)
        archiveRequestById(client, id)
    }

    render() {

        const {
            archiveId,
            match,
            client,
            categories,
            archives: {
                archiveById,
                requestingById
            }
        } = this.props


        if(requestingById || archiveById === null) return <Spinner classes={`spinner-screen ${requestingById ? 'visible' : ''}`} />

        const image = `${process.env.REACT_APP_API_URL}${archiveById._links.thumbnail.href}?token=${client.token}`
        const video = `${process.env.REACT_APP_API_URL}${archiveById._links.video.href}?token=${client.token}`

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
                             src={video}
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
                            <Img
                                alt={archiveById.name}
                                className="archive-video-thumbnail"
                                src={[image, 'http://placehold.it/523x297']}
                                loader={<Spinner classes="visible mini-screen" />}
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
                             <div className={`boolean-icon enabled_${archiveById.sync_to_device || false}`}></div>
                         </div>

                         <div className="url">
                             <h3 className="section-title">Share Url</h3>
                             <p className="content-preview">{archiveById.metadata.article_url}</p>
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

const mapStateToProps = (state) => ({
    archives: state.archives
})

export const connected = connect(
    mapStateToProps,
    {
        archiveRequestById,
    }
)(ArchiveDetail)

export default connected

ArchiveDetail.PropTypes = {
    archiveById: React.PropTypes.object.isRequired,
    fetchById: React.PropTypes.func.isRequired
}
