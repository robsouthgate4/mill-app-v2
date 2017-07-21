import React, {PropTypes} from 'react'
import { Link } from 'react-router-dom'

import { CategoryListItemEdit } from './'
import CategoryForm from './CategoryForm'


export class CategoryListEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    onSaveClick() {

    }

    render() {
        const { categories } = this.props
        return (
            <div className="category-list-container edit">                
                <div className='category-list editable flex-table'>
                    <CategoryForm categories={categories} />
                </div>
            </div>
        );
    }
}

CategoryListEdit.propTypes = {
    categories: React.PropTypes.array.isRequired
};
