import React, {PropTypes} from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import { Link } from 'react-router-dom'

import { CategoryListItemEdit } from './'

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

export class CategoryListEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    onSaveClick() {

    }

    render() {
        const { categories } = this.props
        const mappedCategories = categories.map((category, index) =>
                                    <CategoryListItemEdit key={index} category={category} />)

        return (
            <div className="category-list-container edit">
                <div className="category-actions">
                    <Link to="/categories">
                        <button className="default-btn black-btn add-category">Cancel edit</button>
                    </Link>
                    <button className="default-btn white-btn edit-category" onClick={this.onSaveClick}>Save changes</button>
                </div>
                <div className='category-list editable flex-table'>
                    <div className="flex-table-header">
        				<div className="flex-table-cell">On iPad</div>
        				<div className="flex-table-cell category-cell">Category</div>
        				<div className="flex-table-cell">Videos on iPad</div>
        			</div>
                    {mappedCategories}
                </div>
            </div>
        );
    }
}

CategoryListEdit.propTypes = {
    categories: React.PropTypes.array.isRequired
};
