import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { ArchiveList } from '../../components/ArchiveList'
import { ArchiveDetail } from '../../components/ArchiveDetail'
import { ArchiveDetailEdit } from '../../components'
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
        const { page } = this.props
        this.fetchArchives( page )
    }

    fetchArchives = (page) => {
        const {client, archiveRequest, limit, archives} = this.props
        if (client && client.token)
        archiveRequest(client, page, limit)
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

    handlePageClick = (data) => {
        const page = data.selected + 1
        this.fetchArchives(page)
        window.scrollTo(0, 0)
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
                requestingById,
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
                            page={page}
                            onPageClick={this.handlePageClick}
                            client={client}
                            requesting={requesting}
                            archives={list}>
                        </ArchiveList>}
                    />

                    <Route exact path="/archives/:id" render={(match) =>{
                            return <ArchiveDetail
                                    {...match}
                                    client={client}
                                    requestingById={requestingById}
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
