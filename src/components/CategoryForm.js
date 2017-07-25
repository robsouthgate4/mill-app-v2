import React, {PropTypes} from 'react';
import {reduxForm, Field, FieldArray, change, formValueSelector} from 'redux-form'
import {Link} from 'react-router-dom'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {connect} from 'react-redux'
import {categoryUpdateOrder, categoryUpdateRequest, categoryDeleteRequest} from '../modules/categories/actions'
import _ from 'lodash'

import {Modal} from './'

const RenderField = ({
    input,
    label,
    type,
    className,
    meta: {
        touched,
        error
    }
}) => (<input {...input} type={type} className={className} placeholder={label}/>)

const RenderCheckbox = ({
    input,
    label,
    type,
    meta: {
        touched,
        error
    }
}) => (
    <div>
        <input {...input} className="toggleSwitch-checkbox" type={type}/>
        <label className="toggleSwitch-label" htmlFor="enabled">
            <span className="toggleSwitch-inner"></span>
            <span className="toggleSwitch-switch"></span>
        </label>
    </div>
)

const RenderCategoryList = SortableContainer(({
    fields,
    initialValues,
    realValues,
    change,
    onDeleteRequest,
    meta: {
        touched,
        error
    }
}) => (
    <div>
        {fields.map((field, index) => (<RenderCategoryItem key={index} change={change} field={field} index={index} indexVal={index} onDeleteRequest={onDeleteRequest} realValues={realValues} fields={fields}/>))}
    </div>
))

const RenderCategoryItem = SortableElement(({
    value,
    field,
    fieldVal,
    realValues,
    initialValues,
    fields,
    indexVal,
    onDeleteRequest,
    change
}) => (
    <div className="flex-table-row">
        <div className="flex-table-cell">
            <i className="mill-icons_menu"></i>
        </div>
        <div className="flex-table-cell">
            <div onClick={(evt) => change(`${field}.enabled`, !realValues[indexVal].enabled)} className="toggleSwitch">
                <Field name={`${field}.enabled`} type="checkbox" component={RenderCheckbox}/>
            </div>
        </div>
        <div className="flex-table-cell category-cell">
            <Field name={`${field}.name`} type="text" className="large" component={RenderField}/>
        </div>
        <div className="flex-table-cell">
            <Field className="empty" name={`${field}.archive_count`} type="text" component={RenderField}/>
        </div>
        <div className="flex-table-cell delete-cell">
            <button className="mill-icons_delete delete-category" type="button" onClick={() => onDeleteRequest(indexVal, realValues[indexVal].name, realValues[indexVal].id)}></button>
        </div>
    </div>
))

class CategoryForm extends React.Component {

    state = {
        modalVisible: false,
        itemToDeleteName: '',
        itemToDeleteId: ''
    }

    constructor(props) {
        super(props);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const {realValues, change} = this.props
        const newArray = arrayMove(realValues, oldIndex, newIndex)
        change('categories', newArray)
    }

    handleDeleteRequest = (indexVal, name, id) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            itemToDeleteName: name,
            itemToDeleteId: id
        })
    }

    handleDelete = (id) => {
        const {client, categoryDeleteRequest} = this.props
        categoryDeleteRequest(client, id)
    }

    handleCategorySubmit = (values) => {

        const {categoryUpdateRequest, initialValues} = this.props

        // Compare old values with new and return array with only updated
        const a = values.categories
        const b = initialValues.categories
        const updatedArray = _.difference(a, b)

        console.log(updatedArray)
        //categoryUpdateRequest(updatedArray)
    }

    render() {

        const {
            categories,
            tempCategories,
            initialValues,
            handleSubmit,
            change,
            realValues
        } = this.props

        return <div>
                    <form className="edit-category-form" onSubmit={handleSubmit(this.handleCategorySubmit)}>
                        <div className="category-actions">
                            <Link to="/categories">
                                <button className="default-btn black-btn add-category">Cancel edit</button>
                            </Link>
                            <button className="default-btn white-btn edit-category" type="submit">Save changes</button>
                        </div>
                        <div className="flex-table-header">
                            <div className="flex-table-cell">Reorder</div>
                            <div className="flex-table-cell">On iPad</div>
                            <div className="flex-table-cell category-cell">Category</div>
                            <div className="flex-table-cell">Videos on iPad</div>
                            <div className="flex-table-cell">Remove</div>
                        </div>
                        <FieldArray name="categories" realValues={realValues} initialValues={initialValues.categories} helperClass={'SortableHelper'} onSortEnd={this.onSortEnd} distance={10} change={change} onDeleteRequest={this.handleDeleteRequest} component={RenderCategoryList} type="text"/>

                    </form>
                    <Modal onCloseClick={() => this.setState({modalVisible: false})} classes={`modal ${ !this.state.modalVisible
                        ? 'hidden'
                        : ''}`}>
                        <div className="modal-inner no-flex">
                            <h3>{`Are you sure you wish to remove ${this.state.itemToDeleteName} ?`}</h3>
                            <button type="button" onClick={() => this.handleDelete(this.state.itemToDeleteId)} className="default-btn black-btn">Delete</button>
                        </div>
                    </Modal>
                </div>
    }
}

CategoryForm.propTypes = {
    categories: PropTypes.array.isRequired
};

CategoryForm = reduxForm(
    {
        form: 'categoryUpdateForm',
        enableReinitialize: true
    }
)(CategoryForm)

const mapStateToProps = state => ({
    categories: state.categories.list, realValues: formValueSelector('categoryUpdateForm')(state, 'categories'),
    client: state.client,
    initialValues: {
        categories: state.categories.list
    }
})

CategoryForm = connect(mapStateToProps, {categoryUpdateRequest, change, categoryDeleteRequest})(CategoryForm)

export default CategoryForm
