import React, {PropTypes} from 'react';

export const CategoryListItemEdit = (props) => {
    const {category} = props
    return <div className="flex-table-row">
        <div className="flex-table-cell">
            <div className={`boolean-icon enabled_${category.synced}`}></div>
        </div>
        <div className="flex-table-cell category-cell">{category.name}</div>
        <div className="flex-table-cell">{category.videosSynced}</div>
    </div>
}

CategoryListItemEdit.propTypes = {
    category: React.PropTypes.object.isRequired
};
