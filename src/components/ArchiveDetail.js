import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { CreditList } from './'

export class ArchiveDetail extends React.Component {

    componentDidMount(){
        const { fetchById, match } = this.props
        fetchById(match.params.id)
    }

    render() {

        const {
            archiveById,
            match
        } = this.props

        if(archiveById === null) return <div>Loading archive...</div>

        return <div className="edit-archive-container">
                    <div className="content">
                        {archiveById.id}
                        <div className="media-container">
                            <div className="video-overlay video-play">
                                <span className="mill-icons_play"></span>
                            </div>
                            <img alt="Stream" className="archive-video-thumbnail" src={`${archiveById._links.thumbnail.href}`}/>
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
                            <div className={`boolean-icon enabled_${archiveById.enabled}`}></div>
                        </div>

                        <div className="url">
                            <h3 className="section-title">Share Url</h3>
                            <p className="content-preview">{archiveById.article_url}</p>
                        </div>

                        <div className="categories">
                            <h3 className="section-title">Categories</h3>
                            <p>one, two, three, faks</p>
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
