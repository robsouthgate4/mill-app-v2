import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import {ArchiveList} from '../components/ArchiveList'
import {ArchiveDetail} from '../components/ArchiveDetail'
import {ArchiveDetailEdit} from '../components'

import {archiveCreate, archiveRequest, archiveRequestById, archiveUpdate} from './actions'
import { withRouter } from 'react-router'

class Archives extends Component {

    constructor(props) {
        super(props)
        this.fetchArchives()
    }

    componentDidMount() {
        console.log('hello');
    }

    fetchArchives = (id) => {
        const {client, archiveRequest, page} = this.props
        //if (client && client.token)
        archiveRequest(client, id, 2)
    }

    updateArchive = (archive) => {
        const { client, archiveUpdate, reset, archiveById } = this.props
        const id = archiveById.id
        //if (client && client.token)
        archiveUpdate(client, id, archive)
        reset()
    }

    fetchById = (id) => {
        const {client, archiveRequestById} = this.props
        //if (client && client.token)
        this.props.archiveRequestById(client, id)
    }

    render() {
        const {
            match,
            handleSubmit,
            invalid,
            archiveId,
            archiveById,
            archives: {
                list,
                page,
                requesting,
                successful,
                messages,
                errors
            }
        } = this.props

        return (
            <div className="archives">
                current page: {page}
                <Switch>
                    <Route exact path="/archives" render={(props) => <ArchiveList archives={list}></ArchiveList>} />
                    <Route exact path="/archives/:id" render={(match) =>{
                            return <ArchiveDetail
                                    {...match}
                                    archiveById={archiveById}
                                    fetchById={this.fetchById}>
                                </ArchiveDetail>
                        }}
                    />
                    <Route path="/archives/:id/edit" render={(match) =>{
                            return <ArchiveDetailEdit
                                {...match}
                                handleSubmit={handleSubmit(this.updateArchive)}
                                fetchById={this.fetchById}
                                archiveById={archiveById}>
                            </ArchiveDetailEdit>
                        }}
                     />
                </Switch>
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
    archives: state.archives,
    archiveById: state.archives.archiveById,
    page: state.archives.page
})

const connected = withRouter(connect(
    mapStateToProps,
    {
        archiveRequestById,
        archiveCreate,
        archiveRequest,
        archiveUpdate
    }
)(Archives))
const formed = reduxForm({form: 'archiveUpdateForm'})(connected)

export default formed
