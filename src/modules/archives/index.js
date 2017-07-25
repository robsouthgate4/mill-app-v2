import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import queryString from 'query-string'

import history from '../../lib/history'

import { ArchiveList } from '../../components/ArchiveList'
import  ArchiveDetail  from '../../components/ArchiveDetail'
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
        let { page, location } = this.props
        window.scrollTo(0, 0)
        this.fetchArchives( page )
    }

    fetchArchives = (page) => {
        const {client, archiveRequest, limit, archives, match} = this.props
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

    handlePageClick = (data) => {
        const { client, match } = this.props
        const page = data.selected + 1
        if (client && client.token)
        this.fetchArchives(page)
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
                requestingById,
                limit,
                totalArchives,
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
                            page={page - 1}
                            onPageClick={this.handlePageClick}
                            client={client}
                            totalArchives={totalArchives}
                            limit={limit}
                            requesting={requesting}
                            archives={list}>
                        </ArchiveList>}
                    />

                    <Route exact path="/archives/:id" render={(match) =>{
                            return <ArchiveDetail
                                    {...match}
                                    client={client}>
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

                    <Redirect to="/archives"/>
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
