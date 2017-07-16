import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import { ArchiveList } from '../components/ArchiveList'

// include our archiveRequest action
import { archiveCreate, archiveRequest } from './actions'

// Our validation function for `name` field.
const nameRequired = value => (value ? undefined : 'Name Required')

class Archives extends Component {

  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.fetchArchives()
  }

  // the helper function for requesting archives
  // with our client as the parameter
  fetchArchives = () => {
    const { client, archiveRequest } = this.props
    if (client && client.token) return archiveRequest(client)
    return false
  }


  submit = (archive) => {
    const { client, archiveCreate, reset } = this.props
    // call to our archiveCreate action.
    archiveCreate(client, archive)
    // reset the form upon submit.
    reset()
  }

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  )

  render () {

    console.log(this.props);

    const {
      handleSubmit,
      invalid,
      archives: {
        list,
        requesting,
        successful,
        messages,
        errors,
      }
    } = this.props

    return (
      <div className="archives">
        <h2>Hello from archives</h2>
        <ArchiveList />
      </div>
    )
  }
}

// Pull in both the Client and the Archives state
const mapStateToProps = state => ({
  client: state.client,
  archives: state.archives,
})

// Make the Client and Archives available in the props as well
// as the archiveCreate() function
const connected = connect(mapStateToProps, { archiveCreate, archiveRequest})(Archives)
const formed = reduxForm({
  form: 'archives'
})(connected)

export default formed
