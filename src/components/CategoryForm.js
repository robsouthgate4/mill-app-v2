import React, {PropTypes} from 'react';
import {reduxForm, Field, FieldArray, change, formValueSelector} from 'redux-form'
import {Link} from 'react-router-dom'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import {connect} from 'react-redux'
import {categoryUpdateOrder, categoryUpdateRequest} from '../categories/actions'
import _ from 'lodash'

const RenderField = ({ input, label, type, className, meta: { touched, error } }) =>
    (<input {...input} type={type} className={className} placeholder={label}/>)

const RenderCheckbox = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input {...input} className="toggleSwitch-checkbox" type={type}/>
        <label className="toggleSwitch-label" htmlFor="enabled">
            <span className="toggleSwitch-inner"></span>
            <span className="toggleSwitch-switch"></span>
        </label>
    </div>
)

const RenderCategoryList = SortableContainer(({ fields, initialValues, realValues, change, meta: { touched, error } }) => (
    <div>
        {fields.map((field, index) => (
            <RenderCategoryItem
                key={index}
                change={change}
                field={field}
                index={index}
                indexVal={index}
                realValues={realValues}
                fields={fields}/>
        ))}
    </div>
))

const RenderCategoryItem = SortableElement(({value, field, fieldVal, realValues, initialValues, fields, indexVal, change}) => (
    <div className="flex-table-row">
        <div className="flex-table-cell">
            <i className="mill-icons_menu"></i>
        </div>
        <div className="flex-table-cell">
            <div onClick={ (evt) => change(`${field}.enabled`, !realValues[indexVal].enabled)} className="toggleSwitch">
                <Field name={`${field}.enabled`} type="checkbox" component={RenderCheckbox}/>
            </div>
        </div>
        <div className="flex-table-cell category-cell">
            <Field name={`${field}.name`} type="text" className="large" component={RenderField}/>
        </div>
        <div className="flex-table-cell">
            <Field className="empty" name={`${field}.videos_synced`} type="text" component={RenderField}/>
        </div>
        <div className="flex-table-cell delete-cell">
            <button className="mill-icons_delete delete-category" type="button" onClick={() => fields.remove(indexVal)}></button>
        </div>
    </div>
))




class CategoryForm extends React.Component {

    constructor(props) {
        super(props);
    }

    onSortEnd = ({oldIndex, newIndex, }) => {
        const { realValues, change } = this.props
        const newArray = arrayMove(realValues, oldIndex, newIndex)
        change('categories', newArray)
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

        const {categories, tempCategories, initialValues, handleSubmit, change, realValues} = this.props

        return <form className="edit-category-form" onSubmit={handleSubmit(this.handleCategorySubmit)}>
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
            <FieldArray
                name="categories"
                realValues={realValues}
                initialValues={initialValues.categories}
                helperClass={'SortableHelper'}
                onSortEnd={this.onSortEnd}
                distance={10}
                change={change}
                component={RenderCategoryList}
                type="text"/>
        </form>

    }
}

CategoryForm.propTypes = {
    categories: PropTypes.array.isRequired
};

CategoryForm = reduxForm({form: 'categoryUpdateForm', enableReinitialize: true})(CategoryForm)

const mapStateToProps = state => ({
    categories: state.categories.list,
    realValues: formValueSelector('categoryUpdateForm')(state, 'categories'),
    initialValues: {
        categories: state.categories.list
    }
})

CategoryForm = connect(
    mapStateToProps,
    {
        categoryUpdateRequest,
        change
    })(CategoryForm)

export default CategoryForm
