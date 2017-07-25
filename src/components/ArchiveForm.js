import React, {PropTypes} from 'react'
import {reduxForm, Field, FieldArray, change, formValueSelector} from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Img from 'react-image'

import { RenderMultiselect, Spinner } from './'

import { categoryRequest } from '../modules/categories/actions'
import { archiveUpdate } from '../modules/archives/actions'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
    </div>
  </div>
)

const renderCredits = ({ fields, meta: { touched, error } }) => (
  <ul>
    {fields.map((credit, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove credit section"
          onClick={() => fields.remove(index)}>
          Remove credit section
      </button>
        <Field
          name={`${credit}.name`}
          type="text"
          component={renderField}/>
        <FieldArray name={`${credit}.credit_details`} component={renderCreditDetails}/>
      </li>
    )}
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Credit section</button>
    </li>
  </ul>
)

const renderCreditDetails = ({ fields, meta: { error } }) => (
  <ul>
    {fields.map((detail, index) =>
      <li className="credit-detail-item" key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}/>
        <Field
          name={`${detail}.name`}
          type="text"
          component={renderField}/>
      <Field
        name={`${detail}.content`}
        type="text"
        component={renderField}/>
      </li>
    )}
    <li>
      <button type="button" onClick={() => fields.push()}>Add Credit</button>
    </li>
  </ul>
)

const RenderCheckbox = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input {...input} className="toggleSwitch-checkbox" type={type}/>
        <label className="toggleSwitch-label" htmlFor="enabled">
            <span className="toggleSwitch-inner"></span>
            <span className="toggleSwitch-switch"></span>
        </label>
    </div>
)

class ArchiveForm extends React.Component {

    updateSubmit = (values) => {
        const archive = values.archive
        const {client, archiveUpdate, archiveById} = this.props
        archiveUpdate(client, archive, archiveById.id)
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        const {client, categoryRequest, categories} = this.props
        if (client && client.token)
        categoryRequest(client)
    }

    render() {
        const {
                handleSubmit,
                archiveById,
                match,
                pristine,
                reset,
                formValues,
                change,
                client,
                submitting,
                archives,
                categories: {
                    list,
                    requesting
                },
                initialValues} = this.props;

        const options = list.map(category => category.name)
        const defaults = archiveById.categories.map(category => category.name)
        const image = `${process.env.REACT_APP_API_URL}${archiveById._links.thumbnail.href}?token=${client.token}`


        return (
            <form className="edit-archive-form" onSubmit={handleSubmit(this.updateSubmit)}>
                <div className="content">
                    <div className="media-container">
                        <div className="video-overlay thumbnail">
                            <span className="icon_camera"></span>
                        </div>
                        <Img
                            alt={archiveById.name}
                            className="archive-video-thumbnail"
                            src={[image, 'http://placehold.it/523x297']}
                            loader={<Spinner classes="visible mini-screen" />}
                        />
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="name">Title</label>
                        <Field name="archive.name" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="brand">Brand</label>
                        <Field name="archive.brand" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="intro">Intro</label>
                        <Field name="archive.intro" component="input" type="text"></Field>
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="summary">Summary</label>
                        <Field name="archive.summary" component="textarea"></Field>
                    </div>

                    <div className="field">
                        <label className="field-label" htmlFor="createdAt">Date</label>
                        <Field name="archive.created_at" component="input" type="text"></Field>
                    </div>

                </div>

                <div className="sidebar">
                    <div className="edit-button-container">
                        <Link to={`/archives/${match.params.id}`}>
                            <button disabled={submitting} className="default-btn white-btn cancel" type="button">Cancel</button>
                        </Link>
                        <button disabled={submitting} className="default-btn black-btn save" type="submit">Save changes</button>
                    </div>

                    {archives.requesting && <div>Updating</div>}

                    <div className="ipad-push-container">
                        <h3 className="section-title">Available on iPad</h3>
                        <div className="toggleSwitch push-ipad" onClick={ (evt) => change(`archive.sync_to_device`, !formValues.sync_to_device)}>
                            <Field
                                component={RenderCheckbox}
                                className="syncVideo ipad-push-checkbox toggleSwitch-checkbox"
                                name="archive.sync_to_device"
                                type="checkbox"/>
                        </div>
                    </div>

                    <div className="url">
                        <h3 className="section-title">Share Url</h3>
                        <Field name="archive.metadata.article_url" component="input" type="text"></Field>
                    </div>

                    <div className="categories">
                        <h3 className="section-title">Categories</h3>
                        {requesting && <div>Loading categories...</div>}
                        {!requesting && <Field
                            name="archive.categories"
                            className="category-drop-down"
                            data={options}
                            value={defaults}
                            valueField="name"
                            textField="label"
                            component={RenderMultiselect}/>}
                    </div>

                    <div className="credits-editor">
                        <FieldArray change={change} name="archive.credits" component={renderCredits} type="text" />
                    </div>

                </div>
            </form>
        );
    }
}

ArchiveForm.propTypes = {
    initialValues: PropTypes.shape(
        {
            archive: PropTypes.object.isRequired
        }
    )
};

ArchiveForm = reduxForm({
    form: 'archiveUpdateForm',
    enableReinitialize: true
})(ArchiveForm)

ArchiveForm = connect(
   state => ({
        categories: state.categories,
        client: state.client,
        archives: state.archives,
        formValues: formValueSelector('archiveUpdateForm')(state, 'archive'),
        initialValues: {
            archive: state.archives.archiveById
        }
    }),
    {
        change,
        categoryRequest,
        archiveUpdate
    }
)(ArchiveForm)

export default ArchiveForm
