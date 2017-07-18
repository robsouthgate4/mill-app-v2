import React from 'react';
import {Link} from 'react-router-dom'
import {Field, reduxForm} from 'redux-form'
import {getItem} from '../lib/localStorage'

export class ArchiveDetailEdit extends React.Component {

    componentDidMount() {
        const { archiveById, fetchById, match } = this.props
        // If coming straight from url, fetch by ID
        if (archiveById === null) fetchById(match.params.id)
    }

    submitUpdate = (values) => {
        const { match, handleSubmit } = this.props
        const archiveId = match.params.id
    }

    render() {

        const {archiveById, match, handleSubmit} = this.props

        if(archiveById === null) return <div>Loading archive...</div>

        return <div className="edit-archive-container">
            <form onSubmit={handleSubmit}>
                <div className="content">
                    {archiveById.id}
                    <div className="media-container">
                        <div className="video-overlay thumbnail">
                            <span className="icon_camera"></span>
                        </div>
                        <img alt="Stream" className="archive-video-thumbnail" src={`${archiveById._links.thumbnail.href}`}/>
                    </div>

                    <div className="field">
                        <label htmlFor="name">Title</label>
                        <Field name="name" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label htmlFor="brand">Brand</label>
                        <Field name="brand" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label htmlFor="intro">Intro</label>
                        <Field name="intro" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label htmlFor="summary">Summary</label>
                        <Field name="summary" component="textarea"></Field>
                    </div>

                    <div className="field">
                        <label htmlFor="date">Date</label>
                        <Field name="date" component="input" type="text"></Field>
                    </div>

                </div>

                <div className="sidebar">

                    <div className="edit-button-container">

                        <Link to={`/archives/${match.params.id}`}>
                            <button className="default-btn white-btn cancel" type="button" name="button">Cancel</button>
                        </Link>

                        <input className="default-btn black-btn save" name="commit" type="submit" value="Save Changes"/>
                    </div>

                    <div className="ipad-push-container">
                        <h3 className="section-title">Available on iPad</h3>

                    </div>

                    <div className="url">
                        <h3 className="section-title">Share Url</h3>

                    </div>

                    <div className="categories">
                        <h3 className="section-title">Categories</h3>

                    </div>
                </div>
            </form>
        </div>;
    }
}

ArchiveDetailEdit.PropTypes = {
    archiveById: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    fetchById: React.PropTypes.func.isRequired
}
