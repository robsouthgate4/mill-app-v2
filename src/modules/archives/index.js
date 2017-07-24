import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import {ArchiveList} from '../../components/ArchiveList'
import {ArchiveDetail} from '../../components/ArchiveDetail'
import {ArchiveDetailEdit} from '../../components'
import Header from '../../components/Header'

import {
        archiveCreate,
        archiveRequest,
        archiveRequestById,
        archiveUpdate} from './actions'

import { categoryRequest } from '../categories/actions'

class Archives extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchArchives()
    }

    fetchArchives = (id) => {
        const {client, archiveRequest, page, limit, archives} = this.props
        if (client.token && archives.list.length === 0)
        archiveRequest(client, id, page, limit)
    }


    updateArchive = (archive) => {
        const { client, archiveUpdate, reset, archiveById } = this.props
        const id = archiveById.id
        //if (client && client.token)
        //archiveUpdate(client, id, archive)
        //reset()
    }

    fetchById = (id) => {
        const {client, archiveRequestById} = this.props
        if (client && client.token)
        archiveRequestById(client, id)
    }

    render() {
        const {
            match,
            invalid,
            archiveId,
            initialValues,
            client,
            archives: {
                archiveById,
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
                <Switch>

                    <Route exact path="/archives" render={(props) =>
                        <ArchiveList
                            client={client}
                            requesting={requesting}
                            archives={list}>
                        </ArchiveList>}
                    />

                    <Route exact path="/archives/:id" render={(match) =>{
                            return <ArchiveDetail
                                    {...match}
                                    client={client}
                                    archiveById={archiveById}
                                    fetchById={this.fetchById}>
                                </ArchiveDetail>
                        }}
                    />

                    <Route path="/archives/:id/edit" render={(match) =>{
                            return <ArchiveDetailEdit
                                {...match}
                                client={client}
                                initialValues={initialValues}
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

const mapStateToProps = (state) => ({
    client: state.client,
    archives: state.archives,
    archiveById: state.archives.archiveById,
    page: state.archives.page,
    limit: state.archives.limit
})

const connected = withRouter(connect(
    mapStateToProps,
    {
        archiveRequestById,
        archiveCreate,
        archiveRequest,
        archiveUpdate,
    }
)(Archives))

export default connected
