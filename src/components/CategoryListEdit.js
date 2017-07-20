import React, {PropTypes} from 'react'
import { Link } from 'react-router-dom'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'

import { CategoryListItemEdit } from './'


const SortableItem = SortableElement(({value, index}) =>
        <div className="flex-table-row">
            <div className="flex-table-cell">
				<i className="mill-icons_menu"></i>
			</div>
            <div className="flex-table-cell">
				<div className="toggleSwitch">
					<input className="toggleSwitch-checkbox" name="enabled" type="checkbox" value="true"/>
                    <label className="toggleSwitch-label" htmlFor="enabled">
                        <span className="toggleSwitch-inner"></span>
    					<span className="toggleSwitch-switch"></span>
                    </label>					
				</div>
			</div>
            <div className="flex-table-cell category-cell">
				<input className="large" id="categories_1_name" name="categories[1][name]" type="text" value="Array"/>
            </div>
            <div className="flex-table-cell">
                1
            </div>
            <div className="flex-table-cell">{value.videosSynced}</div>
            <div className="flex-table-cell delete-cell">
				<button className="mill-icons_delete delete-category" title=""></button>
            </div>
        </div>
)

const SortableList = SortableContainer(({categories}) => {
    return <div>
                {categories.map((category, index) => (
                        <SortableItem className="sortableitem" key={`item-${index}`} index={index} value={category} />
                ))}
            </div>
})

export class CategoryListEdit extends React.Component {

    constructor(props) {
        super(props);
    }

    onSaveClick() {

    }

    onSortEnd({oldIndex, newIndex}) {
        console.log(oldIndex)
        console.log(newIndex)
    }

    render() {
        const { categories } = this.props

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
                    <SortableList categories={categories} helperClass="SortableHelper" onSortEnd={this.onSortEnd} />
                </div>
            </div>
        );
    }
}

CategoryListEdit.propTypes = {
    categories: React.PropTypes.array.isRequired
};
