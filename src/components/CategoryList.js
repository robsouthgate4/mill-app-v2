import React from 'react'
import {Link} from 'react-router-dom'
import {CategoryListItem, Modal} from './'

export class CategoryList extends React.Component {

    state = {
        modalVisible: false,
        categoryText: ''
    }

    onInputChange = (evt) => {
        this.setState({categoryText: evt.target.value})
    }

    onNewCategorySubmit = () => {
        const { onNewCategorySubmit } = this.props
        const category = this.state.categoryText
        onNewCategorySubmit(category)
    }

    render() {
        const {categories} = this.props
        const mappedCategories = categories.map((category, index) => <CategoryListItem key={index} category={category}/>)
        return (
            <div className="category-list-container">
                <div className="category-actions">
                    <button onClick={() => this.setState({modalVisible: true})} className="default-btn black-btn add-category">Add Category</button>
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
                <Modal
                    onCloseClick={() =>
                        this.setState({modalVisible: false})}
                    classes={`modal ${ !this.state.modalVisible ? 'hidden' : ''}`}>
                    <div className="category-add-form">
                        <label htmlFor="category_name">Category Name</label>
                        <input type="text" className="large" value={this.state.categoryText} onChange={this.onInputChange}/>
                        <button type="button" onClick={this.onNewCategorySubmit} className="default-btn black-btn">Add New Category</button>
                    </div>
                </Modal>
            </div>
        )
    }
}
