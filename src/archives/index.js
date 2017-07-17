import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import {ArchiveList} from '../components/ArchiveList'

import {archiveCreate, archiveRequest} from './actions'

class Archives extends Component {

    constructor(props) {
        super(props)
        // call the fetch when the component starts up
        this.fetchArchives()
    }

    // the helper function for requesting archives
    // with our client as the parameter
    fetchArchives = (id) => {
        const {client, archiveRequest} = this.props
        //if (client && client.token)
        this.props.archiveRequest(client, id)
    }

    submit = (archive) => {
        const {client, archiveCreate, reset} = this.props
        // call to our archiveCreate action.
        archiveCreate(client, archive)
        // reset the form upon submit.
        reset()
    }

    render() {

        const {
            handleSubmit,
            invalid,
            archiveId,
            archives: {
                list,
                requesting,
                successful,
                messages,
                errors
            }
        } = this.props

        const listing = requesting
            ? '...loading'
            : <ArchiveList archives={list}/>

        return (
            <div className="archives">
                {listing}
            </div>
        )
    }
}

Archives.propTypes = {
    archives: React.PropTypes.object.isRequired,
    client: React.PropTypes.object.isRequired,
    archiveRequest: React.PropTypes.func.isRequired,
    archiveCreate: React.PropTypes.func.isRequired
}

// Pull in both the Client and the Archives state
const mapStateToProps = (state, ownProps) => ({
    client: state.client,
    archives: state.archives
})

const connected = connect(mapStateToProps, {archiveCreate, archiveRequest})(Archives)
const formed = reduxForm({form: 'archives'})(connected)

export default formed
