import React, {PropTypes} from 'react'
import { Link } from 'react-router-dom'
import { CategoryListItem } from './'

export const CategoryList = (props) => {
    const { categories } = props
    const mappedCategories = categories.map((category, index) =>
                                <CategoryListItem key={index} category={category} />)
    return (
        <div className="category-list-container">
            <div className="category-actions">
                <button className="default-btn black-btn add-category">Add Category</button>
                <Link to="/categories/edit">
                    <button className="default-btn white-btn edit-category">Edit categories</button>
                </Link>
            </div>
            <div className='category-list flex-table'>
                <div className="flex-table-header">
    				<div className="flex-table-cell">On iPad</div>
    				<div className="flex-table-cell category-cell">Category</div>
    				<div className="flex-table-cell">Videos on iPad</div>
    			</div>
                {mappedCategories}
            </div>
        </div>
    )
}

CategoryList.propTypes = {
    categories: React.PropTypes.array.isRequired
};
